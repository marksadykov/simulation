import React from 'react';

import styles from './SimulationSettings.module.css';

export default function SimulationSettings({
  simulationState,
  onSettingChange,
  onRestartButtonClick,
}) {
  return (
    <div className={ styles.container }>
      <div className={ styles.form }>
      <label>
        Навальное количество частично используемых<br />
        <input
          type={ 'range' }
          onChange={ onSettingChange('initialSickAgents') }
          value={ simulationState.initialSickAgents }
          min={ 0 }
          max={ 10 }
        /> <span className={ styles.value }>{ simulationState.initialSickAgents }</span>
      </label>
      <label>
        Воркеров в процессе <br />
        <input
          type={ 'range' }
          onChange={ onSettingChange('agentsPerHouse') }
          value={ simulationState.agentsPerHouse }
          min={ 1 }
          max={ 10 }
        /> <span className={ styles.value }>{ simulationState.agentsPerHouse }</span>
      </label>
      <label>
        Количество процессов <br />
        <input
          type={ 'range' }
          onChange={ onSettingChange('houses') }
          value={ simulationState.houses }
          min={ 0 }
          max={ 100 }
        /> <span className={ styles.value }>{ simulationState.houses }</span>
      </label>
      <label>
        Master 1 <br />
        <input
          type={ 'range' }
          onChange={ onSettingChange('busStations') }
          value={ simulationState.busStations }
          min={ 0 }
          max={ 10 }
        /> <span className={ styles.value }>{ simulationState.busStations }</span>
      </label>
      <label>
        Master 2 <br />
        <input
          type={ 'range' }
          onChange={ onSettingChange('hospitals') }
          value={ simulationState.hospitals }
          min={ 0 }
          max={ 10 }
        /> <span className={ styles.value }>{ simulationState.hospitals }</span>
      </label>
      <label>
        Master 3 <br />
        <input
          type={ 'range' }
          onChange={ onSettingChange('supermarkets') }
          value={ simulationState.supermarkets }
          min={ 0 }
          max={ 10 }
        /> <span className={ styles.value }>{ simulationState.supermarkets }</span>
      </label>
      <label>
        Master 4 <br />
        <input
          type={ 'range' }
          onChange={ onSettingChange('temples') }
          value={ simulationState.temples }
          min={ 0 }
          max={ 10 }
        /> <span className={ styles.value }>{ simulationState.temples }</span>
      </label>
      </div>

      <div className={ styles.footer }>
        <button onClick={ onRestartButtonClick }>Перезапуск симуляции</button>
      </div>
    </div>
  );
}
