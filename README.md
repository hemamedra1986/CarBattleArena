# Car Battle Arena

## Project Structure

The Car Battle Arena project is organized into several key directories that help maintain structure and readability:

- **Assets**: Contains all game assets including models, textures, audio files, and scripts.
  - **Models**: 3D models of cars, obstacles, and environments.
  - **Textures**: Images applied to 3D models for enhanced visuals.
  - **Audio**: Sound effects and music files used in the game.
  - **Scripts**: C# scripts that control game functionality.

- **Scenes**: Unity scene files (.unity) that define different levels and game states.
- **Prefabs**: Reusable game objects that can be instantiated during gameplay.
- **ProjectSettings**: Files for Unity project settings such as input management and player settings.

## Setup Instructions

To set up and run the Car Battle Arena project on your local machine, follow these steps:

1. **Clone the Repository**: Run the following command in your terminal:
   ```bash
   git clone https://github.com/hemamedra1986/CarBattleArena.git
   ```

2. **Open in Unity**:
   - Make sure you have the latest version of Unity installed.
   - Open Unity Hub and click on 'Add'.
   - Select the cloned project folder.
   - Click 'Open' to load the project in Unity.

3. **Install Dependencies**:
   - Use the Unity Package Manager to install any required packages for multiplayer support (e.g., Mirror or Photon).
   
4. **Build and Run**:
   - Once everything is set up, click on `File > Build Settings` to select your target platform.
   - Click on `Build and Run` to compile the game and start playing.

5. **Multiplayer Setup**:
   - Follow any additional setup instructions in the documentation for the multiplayer library you are using.