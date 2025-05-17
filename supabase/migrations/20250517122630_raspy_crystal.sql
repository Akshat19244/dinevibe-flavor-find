/*
  # Schema update for restaurant features

  1. New Tables
    - `restaurants`
      - `id` (uuid, primary key)
      - `owner_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `cuisine` (text)
      - `price_range` (text)
      - `images` (text[])
      - `is_approved` (boolean)
      - `created_at` (timestamptz)

    - `reservations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `restaurant_id` (uuid, references restaurants)
      - `guest_count` (integer)
      - `budget` (text)
      - `location` (text)
      - `event_type` (text)
      - `optional_dish` (text)
      - `optional_decoration` (text)
      - `booking_date` (timestamptz)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for restaurant owners
    - Add policies for admin users

  3. Changes
    - Add `role` and `is_admin` columns to profiles table
*/

-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  location text NOT NULL,
  cuisine text NOT NULL,
  price_range text NOT NULL,
  images text[],
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE SET NULL,
  guest_count integer NOT NULL,
  budget text NOT NULL,
  location text NOT NULL,
  event_type text NOT NULL,
  optional_dish text,
  optional_decoration text,
  booking_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Add new columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Enable RLS
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Policies for restaurants table
CREATE POLICY "Public users can view approved restaurants"
  ON restaurants
  FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Restaurant owners can view their own restaurants"
  ON restaurants
  FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Restaurant owners can insert their own restaurants"
  ON restaurants
  FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Restaurant owners can update their own restaurants"
  ON restaurants
  FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Admins can view all restaurants"
  ON restaurants
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND is_admin = true
  ));

-- Policies for reservations table
CREATE POLICY "Users can view their own reservations"
  ON reservations
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own reservations"
  ON reservations
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own reservations"
  ON reservations
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Restaurant owners can view reservations for their restaurants"
  ON reservations
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM restaurants
    WHERE restaurants.id = reservations.restaurant_id
    AND restaurants.owner_id = auth.uid()
  ));

CREATE POLICY "Restaurant owners can update reservations for their restaurants"
  ON reservations
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM restaurants
    WHERE restaurants.id = reservations.restaurant_id
    AND restaurants.owner_id = auth.uid()
  ));

CREATE POLICY "Admins can view all reservations"
  ON reservations
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND is_admin = true
  ));