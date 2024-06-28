# 🔄 Round-Robin Process Simulator

A dynamic and interactive simulator for visualizing the Round-Robin scheduling algorithm, built with React.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Components](#-components)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 📊 Interactive process entry and visualization
- ⏱️ Customizable quantum time
- 🔄 Real-time simulation of Round-Robin scheduling
- 📈 Dynamic charts and tables for process states
- 🎨 Sleek and responsive UI with Tailwind CSS

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/round-robin-simulator.git
   cd round-robin-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🖥️ Usage

1. Open the application in your web browser.
2. Use the Form component to add processes with their burst times.
3. Set the quantum time using the Header component.
4. Click "Start Simulation" to begin the Round-Robin scheduling visualization.
5. Observe the process flow through various states in real-time.
6. Use "Reset" to clear all data and start over.

## 🧩 Components

- `BarList`: Visualizes process data in bar chart format.
- `CardList`: Displays process information in card format.
- `Form`: Allows users to input new process data.
- `Table`: Shows the current state of processes in the queue.
- `Header`: Contains controls for quantum time and simulation start/reset.
- `Donut`: Represents the distribution of processes in a donut chart.
- `Card`: Displays information about the currently running process.
- `EntryTable`: Shows the initial list of entered processes.
- `FinalTable`: Displays the list of completed processes.
- `ReadyTable`: Shows processes ready to be executed.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
