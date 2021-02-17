import React, { useEffect, useState, useRef } from "react";

import styles from "./App.module.css";
import Graph from "./Graph";
import LineChart from "./LineChart";
import SimulationSettings from "./SimulationSettings";
import { SICK, RECOVERED, DEAD } from "./constants";
import { useInterval } from "./utils";
import { nextSimulationTick, getInitialGraph } from "./simulation";

const INITIAL_SIMULATION_STATE = {
  tick: 0,
  agentsPerHouse: 9,
  houses: 42,
  busStations: 1,
  hospitals: 1,
  supermarkets: 3,
  temples: 1,
  initialSickAgents: 1,
};

const INITIAL_GRAPH = getInitialGraph(INITIAL_SIMULATION_STATE);

function App() {
  const [simulationState, setSimulationState] = useState(
    INITIAL_SIMULATION_STATE
  );
  const [nodes, setNodes] = useState(INITIAL_GRAPH.nodes);
  const [edges, setEdges] = useState(INITIAL_GRAPH.edges);
  const [historicalSickCount, setHistoricalSickCount] = useState([]);
  const [historicalRecoveredCount, setHistoricalRecoveredCount] = useState([]);
  const [historicalDeadCount, setHistoricalDeadCount] = useState([]);
  const [loading, setLoading] = useState(true);

  const graphRef = useRef(null);

  useInterval(() => {
    if (loading) {
      return;
    }

    const { nodes: _nodes, edges: _edges, state } = nextSimulationTick(
      simulationState,
      nodes,
      edges
    );

    setSimulationState(state);

    setHistoricalSickCount(
      historicalSickCount.concat(
        nodes.filter(({ state }) => state === SICK).length
      )
    );

    setHistoricalRecoveredCount(
      historicalRecoveredCount.concat(
        nodes.filter(({ state }) => state === RECOVERED).length
      )
    );

    setHistoricalDeadCount(
      historicalDeadCount.concat(
        nodes.filter(({ state }) => state === DEAD).length
      )
    );
  }, 1000);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const onNodeClick = (nodeId) => {
    return () => {
      const node = nodes.find(({ id }) => nodeId === id);
      if (node.type !== "venue") {
        return;
      }
      node.locked = !node.locked;
    };
  };

  const onSettingChange = (key) => (event) => {
    setSimulationState({ ...simulationState, [key]: event.target.value });
  };

  const onRestartButtonClick = () => {
    const { nodes, edges } = getInitialGraph(simulationState);
    setLoading(true);
    setNodes(nodes);
    setEdges(edges);
    setHistoricalDeadCount([]);
    setHistoricalRecoveredCount([]);
    setHistoricalSickCount([]);
    setSimulationState({ ...simulationState, tick: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Имитационное моделирование дискретных процессов
        </h3>
        <h2>Модель веб-сервера, Садыков, ИУ5-73Б</h2>
      </div>
      <div className={styles.simulation}>
        <div className={styles.samples}>
          <span className={styles.sampleSusceptible}>Незанятые</span>
          <span className={styles.sampleInfected}>Частично</span>
          <span className={styles.sampleRecovered}>Полностью</span>
          <i>Нажмите, чтобы заблокировать процесс</i>
        </div>
        {!loading && (
          <Graph
            width={
              Math.round(
                nodes.filter(({ type }) => type === "venue").length / 6
              ) * 110
            }
            height={700}
            tick={simulationState.tick}
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            ref={graphRef}
          />
        )}
      </div>
      <div className={styles.section}>
        <div className={styles.stats}>
          <h3>Статистика</h3>
          <div className={styles.population}>
            Воркеров: {nodes.filter(({ type }) => type === "agent").length}{" "}
            <br />
            Убитых: {nodes.filter(({ state }) => state === DEAD).length} <br />
            Полностью используемых: {
              nodes.filter(({ state }) => state === RECOVERED).length
            }{" "}
            <br />
            Частично используемых: {nodes.filter(({ state }) => state === SICK).length} <br />
          </div>
          <LineChart
            width={300}
            height={270}
            data={[
              { color: "red", points: historicalSickCount },
              { color: "green", points: historicalRecoveredCount },
              { color: "black", points: historicalDeadCount },
            ]}
          />
        </div>
        <div className={styles.simulationSettings}>
          <h3>Настройки</h3>
          <div className={styles.simulationInfo}>
            Вы можете менять настройки
          </div>
          <SimulationSettings
            simulationState={simulationState}
            onSettingChange={onSettingChange}
            onRestartButtonClick={onRestartButtonClick}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
