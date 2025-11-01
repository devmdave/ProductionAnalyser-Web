# Production Analyser

A web-based dashboard for visualizing and analyzing manufacturing production data, built with Python and Flask.

![Production Analyser Dashboard](https://i.imgur.com/rG4gL4j.png) 

## About The Project

Production Analyser is a Flask-powered web application designed to provide real-time insights into key manufacturing metrics. It features an interactive and responsive dashboard that visualizes data related to production cycle times, fault and delay instances, and tool maintenance (tip dressing).

This tool helps production managers and engineers to identify bottlenecks, reduce downtime, and improve overall operational efficiency.

### Key Features

*   **Interactive Dashboard:** A central hub displaying key performance indicators (KPIs) and production trends.
*   **Cycle Time Analysis:** Visualize and analyze cycle time data for different production stations.
*   **Fault & Delay Tracking:** Monitor and investigate the frequency and duration of production faults and delays.
*   **Tip Dress Monitoring:** Track tip dress cycles to optimize tool maintenance and ensure quality.
*   **Light/Dark Mode:** A modern UI with a theme switcher for user comfort.
*   **Extensible:** Easily add new data sources and visualization pages.

### Built With

*   [Python](https://www.python.org/)
*   [Flask](https://flask.palletsprojects.com/)
*   [Pandas](https://pandas.pydata.org/) for data processing
*   [Chart.js](https://www.chartjs.org/) for interactive charts
*   [Feather Icons](https://feathericons.com/)

---

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

Make sure you have Python 3 and pip installed on your system.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/devmdave/ProductionAnalyser-Web.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd ProductionAnalyser-Web
    ```

3.  **Create and activate a virtual environment:**
    *   **macOS/Linux:**
        ```sh
        python3 -m venv .venv
        source .venv/bin/activate
        ```
    *   **Windows:**
        ```sh
        python -m venv .venv
        .venv\Scripts\activate
        ```

4.  **Install the required packages:**
    ```sh
    pip install -r requirements.txt
    ```

### Running the Application

1.  **Start the Flask development server:**
    ```sh
    python main.py
    ```

2.  **Open your browser:**
    Navigate to `http://127.0.0.1:8080` (or the URL provided in the terminal output).

---

## License

Distributed under the MIT License. You can add a `LICENSE` file to your project for details.

---

## Contact

Dave - [@devmdave](https://github.com/devmdave)

Project Link: [https://github.com/devmdave/ProductionAnalyser-Web](https://github.com/devmdave/ProductionAnalyser-Web)
