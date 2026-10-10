# ICE Task 3 - Interactive Mobile App

Student Name: Lesedi Hlasa

Student Number: ST10512679

Module Name: Mobile App Scripting

Module Code: MAST5112

Lecture Name: Sookha Jessel


## Introduction
ICE Task 3 focuses on building an interactive React Native mobile application using TypeScript and Expo. The application demonstrates core mobile UI components, state management, and user event handling within a functional and responsive layout.

## Development Environment
The project was developed and tested using the following environment:
- Expo framework with standard TypeScript template
- React Native core components and hooks
- Visual Studio Code
- Institutional Virtual Machine
- BlueStacks 5 emulator with Expo Go

## Error Log

Error 1: Button Press State Update
- Location: App.tsx inside the primary interaction handler
- Problem: The state was not updating correctly because the setter function was mutating the state variable directly rather than passing the new value.
- Error Type: State Management Error
- Correction: Updated the state handler to use the proper React state hook setter function.

Error 2: Flexbox Container Alignment
- Location: App.tsx root container style object
- Problem: UI elements were bunching up at the top-left of the screen instead of centering properly.
- Error Type: Layout Styling Error
- Correction: Added justifyContent: 'center' and alignItems: 'center' to the main container style.

Error 3: Text Component Nesting
- Location: App.tsx header section
- Problem: Text styles were failing to apply because child strings were placed outside of dedicated Text components.
- Error Type: Component Rendering Error
- Correction: Wrapped all inline text strings inside properly styled Text components.

## Testing
The application was tested on the BlueStacks 5 emulator:
1. App Launch: Confirmed the app compiles and loads smoothly without initial compilation errors.
2. Interactivity: Tested button presses and input triggers to ensure state changes reflect instantly on the UI.
3. Layout Verification: Checked spacing, padding, and component positioning across the mobile screen view.

## Screenshot

<img width="960" height="1677" alt="IMG_4508" src="https://github.com/user-attachments/assets/f39aad7d-2a60-45d5-a3b1-7a0772238f8e" />

<img width="960" height="1676" alt="IMG_4509" src="https://github.com/user-attachments/assets/284810e1-20ab-44cd-a8b6-c8d95e0b8c28" />

<img width="960" height="1632" alt="IMG_4510" src="https://github.com/user-attachments/assets/3177254c-e24d-4c06-847e-890699d81df1" />




## Conclusion
Working on ICE Task 3 provided valuable hands-on practice with React Native component structuring, state management, and styling, establishing a strong foundation for building more complex mobile user interfaces.

