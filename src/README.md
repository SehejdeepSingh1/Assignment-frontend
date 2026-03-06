# Frontend Application Source Code

This directory contains the source code for the frontend application, built with Angular. The application is designed to manage devices and shelves, allowing users to create, view, and organize shelf positions within devices.

## Application Overview

The application provides a web interface for:
- Viewing and creating devices (equipment with shelf positions)
- Viewing and creating shelves (storage units)
- Managing shelf positions within devices
- Displaying summaries of devices and their associated shelves

## Project Structure

### Root Files
- `index.html` - Main HTML entry point
- `main.ts` - Application bootstrap file
- `styles.css` - Global styles

### `app/` Directory
Contains the main application components and configuration:

- `app.ts` - Root component
- `app.html` - Root template
- `app.css` - Root styles
- `app.routes.ts` - Application routing configuration
- `app.config.ts` - Application configuration
- `app.spec.ts` - Root component tests

### `classes/` Directory
Data model classes defining the core entities:

- `device-definition.ts` - Represents a device with properties like name, part number, building, type, and shelf capacity
- `shelf-definition.ts` - Represents a shelf with name and part number
- `shelf-position.ts` - Represents a position within a device that can hold a shelf, with occupancy status

### `pages/` Directory
Page components for different views:

- `landing/` - Main landing page showing lists of devices and shelves, with creation forms
- `device-summary/` - Displays details of a specific device and its shelf positions
- `shelf-summary/` - Displays details of a specific shelf
- `device-creation/` - Form for creating new devices
- `shelf-creation/` - Form for creating new shelves

### `services/` Directory
Services for API communication:

- `device-service.ts` - Handles device-related API calls
- `shelf-services.ts` - Handles shelf-related API calls

## Architecture

The application follows Angular's standalone components architecture with:
- Standalone components for better tree-shaking
- Reactive forms for data input
- HTTP client for backend communication
- Router for navigation between pages

## Backend Integration

The application communicates with a backend API running on `http://localhost:8080` with endpoints for:
- `/api/devices` - Device management
- `/api/shelves` - Shelf management
- `/api/shelf/shelfpositions` - Shelf position management

## Getting Started

To run the application:
1. Ensure the backend API is running on localhost:8080
2. Navigate to the project root directory
3. Run `npm install` to install dependencies
4. Run `npm start` to start the development server
5. Open your browser to `http://localhost:4200`

## Testing

Run `npm test` to execute the unit tests using the configured test framework.