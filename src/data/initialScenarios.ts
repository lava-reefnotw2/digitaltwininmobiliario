import { ScenarioType, UrbanElement, ForumThread, BudgetVoteAllocation, PilotCityId } from '../types';

export const INITIAL_CITY_ELEMENTS: Record<PilotCityId, Record<string, UrbanElement[]>> = {
  "lima": {
    "base": [
      {
        "id": "lima-base-road-h-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -76.9935,
          -11.988041666666668
        ],
        "pathPoints": [
          [
            -76.997,
            -11.988041666666668
          ],
          [
            -76.99,
            -11.988041666666668
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "lima-base-road-h-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -76.9935,
          -11.985708333333333
        ],
        "pathPoints": [
          [
            -76.997,
            -11.985708333333333
          ],
          [
            -76.99,
            -11.985708333333333
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "lima-base-road-h-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -76.9935,
          -11.983375
        ],
        "pathPoints": [
          [
            -76.997,
            -11.983375
          ],
          [
            -76.99,
            -11.983375
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "lima-base-road-v-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -76.99554166666667,
          -11.986
        ],
        "pathPoints": [
          [
            -76.99554166666667,
            -11.989500000000001
          ],
          [
            -76.99554166666667,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "lima-base-road-v-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -76.99320833333333,
          -11.986
        ],
        "pathPoints": [
          [
            -76.99320833333333,
            -11.989500000000001
          ],
          [
            -76.99320833333333,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "lima-base-road-v-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -76.990875,
          -11.986
        ],
        "pathPoints": [
          [
            -76.990875,
            -11.989500000000001
          ],
          [
            -76.990875,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-0",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -76.99670833333333,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-1",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -76.992625,
          -11.983958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-2",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -76.99495833333333,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-3",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -76.99670833333333,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-4",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -76.99437499999999,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-5",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -76.99145833333333,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-6",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -76.99437499999999,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-7",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -76.99612499999999,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-8",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -76.992625,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-9",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -76.992625,
          -11.985125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-10",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -76.99612499999999,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-11",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -76.992625,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-base-parque_verde-0",
        "scenarioId": "base",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -76.99379166666667,
          -11.983958333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "lima-base-escuela-0",
        "scenarioId": "base",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -76.99379166666667,
          -11.982791666666667
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "lima-base-comercio_local-0",
        "scenarioId": "base",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -76.99145833333333,
          -11.983958333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-base-comercio_local-1",
        "scenarioId": "base",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -76.99204166666667,
          -11.982791666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-base-parada_transporte-0",
        "scenarioId": "base",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -76.99204166666667,
          -11.985125
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "existente"
      }
    ],
    "municipal": [
      {
        "id": "lima-municipal-road-h-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -76.9935,
          -11.988041666666668
        ],
        "pathPoints": [
          [
            -76.997,
            -11.988041666666668
          ],
          [
            -76.99,
            -11.988041666666668
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-road-h-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -76.9935,
          -11.985708333333333
        ],
        "pathPoints": [
          [
            -76.997,
            -11.985708333333333
          ],
          [
            -76.99,
            -11.985708333333333
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-road-h-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -76.9935,
          -11.983375
        ],
        "pathPoints": [
          [
            -76.997,
            -11.983375
          ],
          [
            -76.99,
            -11.983375
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-road-v-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -76.99554166666667,
          -11.986
        ],
        "pathPoints": [
          [
            -76.99554166666667,
            -11.989500000000001
          ],
          [
            -76.99554166666667,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-road-v-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -76.99320833333333,
          -11.986
        ],
        "pathPoints": [
          [
            -76.99320833333333,
            -11.989500000000001
          ],
          [
            -76.99320833333333,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-road-v-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -76.990875,
          -11.986
        ],
        "pathPoints": [
          [
            -76.990875,
            -11.989500000000001
          ],
          [
            -76.990875,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-0",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -76.99495833333333,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-1",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -76.99145833333333,
          -11.983958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-2",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -76.992625,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-3",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -76.99145833333333,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-4",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -76.99379166666667,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-5",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -76.99437499999999,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-6",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -76.99029166666666,
          -11.985125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-7",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -76.99379166666667,
          -11.982791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-8",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -76.992625,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-9",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -76.99612499999999,
          -11.985125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-10",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -76.99145833333333,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-11",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -76.99612499999999,
          -11.984541666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-12",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -76.99204166666667,
          -11.985125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-13",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -76.99029166666666,
          -11.982791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-14",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -76.99612499999999,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-15",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -76.99204166666667,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-16",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -76.99495833333333,
          -11.982791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-17",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -76.99437499999999,
          -11.983958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-18",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -76.99379166666667,
          -11.984541666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-19",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -76.99379166666667,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-20",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -76.99029166666666,
          -11.984541666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-21",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -76.99029166666666,
          -11.983958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_social-0",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -76.992625,
          -11.983958333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_social-1",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -76.99204166666667,
          -11.984541666666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_social-2",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -76.99029166666666,
          -11.986291666666668
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_social-3",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -76.99204166666667,
          -11.982791666666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_social-4",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -76.99495833333333,
          -11.985125
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-parque_verde-0",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -76.99670833333333,
          -11.984541666666667
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-parque_verde-1",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -76.99204166666667,
          -11.983958333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-parque_verde-2",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -76.99437499999999,
          -11.986875000000001
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-centro_salud-0",
        "scenarioId": "municipal",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -76.99670833333333,
          -11.985125
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-escuela-0",
        "scenarioId": "municipal",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -76.99204166666667,
          -11.989208333333334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-comercio_local-0",
        "scenarioId": "municipal",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -76.99437499999999,
          -11.982791666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-comercio_local-1",
        "scenarioId": "municipal",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -76.99437499999999,
          -11.989208333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-parada_transporte-0",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -76.99145833333333,
          -11.984541666666667
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-parada_transporte-1",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -76.99495833333333,
          -11.988625
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      }
    ],
    "comunitario": [
      {
        "id": "lima-comunitario-road-h-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -76.9935,
          -11.988041666666668
        ],
        "pathPoints": [
          [
            -76.997,
            -11.988041666666668
          ],
          [
            -76.99,
            -11.988041666666668
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-road-h-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -76.9935,
          -11.985708333333333
        ],
        "pathPoints": [
          [
            -76.997,
            -11.985708333333333
          ],
          [
            -76.99,
            -11.985708333333333
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-road-h-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -76.9935,
          -11.983375
        ],
        "pathPoints": [
          [
            -76.997,
            -11.983375
          ],
          [
            -76.99,
            -11.983375
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-road-v-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -76.99554166666667,
          -11.986
        ],
        "pathPoints": [
          [
            -76.99554166666667,
            -11.989500000000001
          ],
          [
            -76.99554166666667,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-road-v-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -76.99320833333333,
          -11.986
        ],
        "pathPoints": [
          [
            -76.99320833333333,
            -11.989500000000001
          ],
          [
            -76.99320833333333,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-road-v-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -76.990875,
          -11.986
        ],
        "pathPoints": [
          [
            -76.990875,
            -11.989500000000001
          ],
          [
            -76.990875,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-0",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -76.99029166666666,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-1",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -76.99612499999999,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-2",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -76.99495833333333,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-3",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -76.99437499999999,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-4",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -76.99670833333333,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-5",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -76.99437499999999,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-6",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -76.99145833333333,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-7",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -76.99204166666667,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-8",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -76.99495833333333,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-9",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -76.99437499999999,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-10",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -76.99437499999999,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-11",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -76.992625,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-12",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -76.99437499999999,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-13",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -76.99670833333333,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-14",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -76.99495833333333,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-15",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -76.99379166666667,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-16",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -76.99204166666667,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-17",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -76.99670833333333,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-18",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -76.99379166666667,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-19",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -76.99379166666667,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-20",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -76.99029166666666,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-21",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -76.99612499999999,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-22",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -76.99495833333333,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-23",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 24",
        "coordinates": [
          -76.992625,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-24",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 25",
        "coordinates": [
          -76.99029166666666,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-25",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -76.99495833333333,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-26",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 27",
        "coordinates": [
          -76.99612499999999,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_social-0",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -76.99379166666667,
          -11.987458333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_social-1",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -76.99204166666667,
          -11.988625
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_social-2",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -76.99379166666667,
          -11.986875000000001
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_social-3",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -76.99612499999999,
          -11.987458333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_social-4",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -76.99145833333333,
          -11.986875000000001
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_social-5",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 6",
        "coordinates": [
          -76.992625,
          -11.986875000000001
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-parque_verde-0",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -76.99145833333333,
          -11.988625
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-parque_verde-1",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -76.99204166666667,
          -11.987458333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-parque_verde-2",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -76.99145833333333,
          -11.987458333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-parque_verde-3",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 4",
        "coordinates": [
          -76.99670833333333,
          -11.988625
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-parque_verde-4",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 5",
        "coordinates": [
          -76.99612499999999,
          -11.988625
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-escuela-0",
        "scenarioId": "comunitario",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -76.99670833333333,
          -11.986291666666668
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 0,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-escuela-1",
        "scenarioId": "comunitario",
        "type": "escuela",
        "name": "Escuela 2",
        "coordinates": [
          -76.99029166666666,
          -11.987458333333334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-comercio_local-0",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -76.992625,
          -11.987458333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-comercio_local-1",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -76.99204166666667,
          -11.986291666666668
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-comercio_local-2",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -76.99029166666666,
          -11.986291666666668
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-comercio_local-3",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 4",
        "coordinates": [
          -76.99437499999999,
          -11.984541666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-comercio_local-4",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 5",
        "coordinates": [
          -76.99670833333333,
          -11.984541666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-parada_transporte-0",
        "scenarioId": "comunitario",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -76.99029166666666,
          -11.982791666666667
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      }
    ],
    "hibrido": [
      {
        "id": "lima-hibrido-road-h-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -76.9935,
          -11.988041666666668
        ],
        "pathPoints": [
          [
            -76.997,
            -11.988041666666668
          ],
          [
            -76.99,
            -11.988041666666668
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-road-h-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -76.9935,
          -11.985708333333333
        ],
        "pathPoints": [
          [
            -76.997,
            -11.985708333333333
          ],
          [
            -76.99,
            -11.985708333333333
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-road-h-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -76.9935,
          -11.983375
        ],
        "pathPoints": [
          [
            -76.997,
            -11.983375
          ],
          [
            -76.99,
            -11.983375
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-road-v-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -76.99554166666667,
          -11.986
        ],
        "pathPoints": [
          [
            -76.99554166666667,
            -11.989500000000001
          ],
          [
            -76.99554166666667,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-road-v-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -76.99320833333333,
          -11.986
        ],
        "pathPoints": [
          [
            -76.99320833333333,
            -11.989500000000001
          ],
          [
            -76.99320833333333,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-road-v-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -76.990875,
          -11.986
        ],
        "pathPoints": [
          [
            -76.990875,
            -11.989500000000001
          ],
          [
            -76.990875,
            -11.9825
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-0",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -76.99495833333333,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-1",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -76.99379166666667,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-2",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -76.99437499999999,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-3",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -76.99670833333333,
          -11.983958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-4",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -76.99204166666667,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-5",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -76.99437499999999,
          -11.985125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-6",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -76.99029166666666,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-7",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -76.99612499999999,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-8",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -76.99204166666667,
          -11.985125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-9",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -76.992625,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-10",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -76.99145833333333,
          -11.985125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-11",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -76.99670833333333,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-12",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -76.99612499999999,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-13",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -76.992625,
          -11.984541666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-14",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -76.99029166666666,
          -11.985125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-15",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -76.99437499999999,
          -11.982791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-16",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -76.992625,
          -11.982791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-17",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -76.99495833333333,
          -11.989208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-18",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -76.99204166666667,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-19",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -76.99379166666667,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-20",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -76.99029166666666,
          -11.982791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-21",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -76.99612499999999,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-22",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -76.99670833333333,
          -11.988625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-23",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 24",
        "coordinates": [
          -76.99145833333333,
          -11.983958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-24",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 25",
        "coordinates": [
          -76.99029166666666,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-25",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -76.99204166666667,
          -11.982791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-26",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 27",
        "coordinates": [
          -76.99670833333333,
          -11.987458333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-27",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 28",
        "coordinates": [
          -76.99495833333333,
          -11.986875000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-28",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 29",
        "coordinates": [
          -76.99145833333333,
          -11.986291666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-29",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 30",
        "coordinates": [
          -76.99437499999999,
          -11.984541666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_social-0",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -76.99379166666667,
          -11.989208333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_social-1",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -76.99612499999999,
          -11.989208333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_social-2",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -76.99495833333333,
          -11.984541666666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_social-3",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -76.99437499999999,
          -11.983958333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_social-4",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -76.99029166666666,
          -11.986291666666668
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_social-5",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 6",
        "coordinates": [
          -76.99612499999999,
          -11.985125
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_social-6",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 7",
        "coordinates": [
          -76.99437499999999,
          -11.986291666666668
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-parque_verde-0",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -76.992625,
          -11.987458333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-parque_verde-1",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -76.99145833333333,
          -11.986875000000001
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-parque_verde-2",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -76.99495833333333,
          -11.987458333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-parque_verde-3",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 4",
        "coordinates": [
          -76.99612499999999,
          -11.983958333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-parque_verde-4",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 5",
        "coordinates": [
          -76.99145833333333,
          -11.989208333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-parque_verde-5",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 6",
        "coordinates": [
          -76.99029166666666,
          -11.988625
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-centro_salud-0",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -76.992625,
          -11.983958333333334
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-centro_salud-1",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 2",
        "coordinates": [
          -76.992625,
          -11.985125
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-escuela-0",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -76.99670833333333,
          -11.986875000000001
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-escuela-1",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 2",
        "coordinates": [
          -76.99145833333333,
          -11.988625
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-escuela-2",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 3",
        "coordinates": [
          -76.99029166666666,
          -11.987458333333334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-comercio_local-0",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -76.99612499999999,
          -11.984541666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-comercio_local-1",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -76.99670833333333,
          -11.989208333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-comercio_local-2",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -76.99670833333333,
          -11.982791666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-comercio_local-3",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 4",
        "coordinates": [
          -76.99670833333333,
          -11.984541666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-comercio_local-4",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 5",
        "coordinates": [
          -76.99204166666667,
          -11.983958333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-comercio_local-5",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 6",
        "coordinates": [
          -76.99437499999999,
          -11.988625
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-parada_transporte-0",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -76.99437499999999,
          -11.987458333333334
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-parada_transporte-1",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -76.99145833333333,
          -11.984541666666667
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-parada_transporte-2",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 3",
        "coordinates": [
          -76.99437499999999,
          -11.989208333333334
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      }
    ],
    "custom_1": [],
    "custom_2": [],
    "custom_3": []
  },
  "arequipa": {
    "base": [
      {
        "id": "arequipa-base-road-h-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -71.584,
          -16.328041666666667
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.328041666666667
          ],
          [
            -71.5805,
            -16.328041666666667
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-road-h-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -71.584,
          -16.325708333333335
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.325708333333335
          ],
          [
            -71.5805,
            -16.325708333333335
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-road-h-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -71.584,
          -16.323375000000002
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.323375000000002
          ],
          [
            -71.5805,
            -16.323375000000002
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-road-v-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -71.58604166666667,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58604166666667,
            -16.3295
          ],
          [
            -71.58604166666667,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-road-v-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -71.58370833333333,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58370833333333,
            -16.3295
          ],
          [
            -71.58370833333333,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-road-v-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -71.58137500000001,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58137500000001,
            -16.3295
          ],
          [
            -71.58137500000001,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-0",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -71.58195833333333,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-1",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -71.58254166666667,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-2",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -71.586625,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-3",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -71.58195833333333,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-4",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -71.584875,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-5",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -71.58429166666667,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-6",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -71.58195833333333,
          -16.327458333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-7",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -71.584875,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-8",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -71.58079166666667,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-9",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -71.58195833333333,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-10",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -71.584875,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-vivienda_incremental-11",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -71.584875,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-parque_verde-0",
        "scenarioId": "base",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -71.58195833333333,
          -16.326291666666666
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-escuela-0",
        "scenarioId": "base",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -71.586625,
          -16.325125
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-comercio_local-0",
        "scenarioId": "base",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -71.58720833333334,
          -16.326875
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-comercio_local-1",
        "scenarioId": "base",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -71.58720833333334,
          -16.327458333333333
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-parada_transporte-0",
        "scenarioId": "base",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -71.58720833333334,
          -16.328625
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "existente"
      }
    ],
    "municipal": [
      {
        "id": "arequipa-municipal-road-h-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -71.584,
          -16.328041666666667
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.328041666666667
          ],
          [
            -71.5805,
            -16.328041666666667
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-h-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -71.584,
          -16.325708333333335
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.325708333333335
          ],
          [
            -71.5805,
            -16.325708333333335
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-h-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -71.584,
          -16.323375000000002
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.323375000000002
          ],
          [
            -71.5805,
            -16.323375000000002
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-v-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -71.58604166666667,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58604166666667,
            -16.3295
          ],
          [
            -71.58604166666667,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-v-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -71.58370833333333,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58370833333333,
            -16.3295
          ],
          [
            -71.58370833333333,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-v-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -71.58137500000001,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58137500000001,
            -16.3295
          ],
          [
            -71.58137500000001,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-0",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -71.58545833333334,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-1",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -71.586625,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-2",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -71.58254166666667,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-3",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -71.58079166666667,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-4",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -71.58254166666667,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-5",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -71.58545833333334,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-6",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -71.58312500000001,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-7",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -71.58195833333333,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-8",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -71.58429166666667,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-9",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -71.58254166666667,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-10",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -71.58429166666667,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-11",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -71.58545833333334,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-12",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -71.58079166666667,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-13",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -71.58720833333334,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-14",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -71.58254166666667,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-15",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -71.584875,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-16",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -71.58429166666667,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-17",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -71.58720833333334,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-18",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -71.58545833333334,
          -16.327458333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-19",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -71.58720833333334,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-20",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -71.58720833333334,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-21",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -71.58254166666667,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_social-0",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -71.584875,
          -16.329208333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_social-1",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -71.58429166666667,
          -16.325125
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_social-2",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -71.58545833333334,
          -16.32454166666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_social-3",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -71.58429166666667,
          -16.323958333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_social-4",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -71.58312500000001,
          -16.32454166666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-parque_verde-0",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -71.58429166666667,
          -16.328625
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-parque_verde-1",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -71.58195833333333,
          -16.325125
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-parque_verde-2",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -71.58079166666667,
          -16.326875
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-centro_salud-0",
        "scenarioId": "municipal",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -71.58079166666667,
          -16.323958333333334
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-escuela-0",
        "scenarioId": "municipal",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -71.58195833333333,
          -16.329208333333334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-comercio_local-0",
        "scenarioId": "municipal",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -71.58720833333334,
          -16.323958333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-comercio_local-1",
        "scenarioId": "municipal",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -71.58312500000001,
          -16.325125
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-parada_transporte-0",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -71.58312500000001,
          -16.329208333333334
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-parada_transporte-1",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -71.586625,
          -16.329208333333334
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      }
    ],
    "comunitario": [
      {
        "id": "arequipa-comunitario-road-h-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -71.584,
          -16.328041666666667
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.328041666666667
          ],
          [
            -71.5805,
            -16.328041666666667
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-road-h-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -71.584,
          -16.325708333333335
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.325708333333335
          ],
          [
            -71.5805,
            -16.325708333333335
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-road-h-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -71.584,
          -16.323375000000002
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.323375000000002
          ],
          [
            -71.5805,
            -16.323375000000002
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-road-v-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -71.58604166666667,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58604166666667,
            -16.3295
          ],
          [
            -71.58604166666667,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-road-v-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -71.58370833333333,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58370833333333,
            -16.3295
          ],
          [
            -71.58370833333333,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-road-v-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -71.58137500000001,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58137500000001,
            -16.3295
          ],
          [
            -71.58137500000001,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-0",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -71.58545833333334,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-1",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -71.58195833333333,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-2",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -71.584875,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-3",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -71.58079166666667,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-4",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -71.58429166666667,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-5",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -71.58720833333334,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-6",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -71.58312500000001,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-7",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -71.58254166666667,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-8",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -71.58720833333334,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-9",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -71.58195833333333,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-10",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -71.58720833333334,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-11",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -71.586625,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-12",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -71.58312500000001,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-13",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -71.586625,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-14",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -71.58079166666667,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-15",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -71.58312500000001,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-16",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -71.58720833333334,
          -16.327458333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-17",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -71.58312500000001,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-18",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -71.58254166666667,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-19",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -71.58429166666667,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-20",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -71.58195833333333,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-21",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -71.58195833333333,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-22",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -71.58312500000001,
          -16.327458333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-23",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 24",
        "coordinates": [
          -71.58254166666667,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-24",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 25",
        "coordinates": [
          -71.58079166666667,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-25",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -71.58545833333334,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-26",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 27",
        "coordinates": [
          -71.586625,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_social-0",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -71.58254166666667,
          -16.327458333333333
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_social-1",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -71.58545833333334,
          -16.329208333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_social-2",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -71.586625,
          -16.326875
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_social-3",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -71.58195833333333,
          -16.327458333333333
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_social-4",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -71.586625,
          -16.323958333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_social-5",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 6",
        "coordinates": [
          -71.58254166666667,
          -16.326291666666666
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-parque_verde-0",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -71.58195833333333,
          -16.329208333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-parque_verde-1",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -71.58195833333333,
          -16.32454166666667
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-parque_verde-2",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -71.58720833333334,
          -16.326875
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-parque_verde-3",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 4",
        "coordinates": [
          -71.58079166666667,
          -16.327458333333333
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-parque_verde-4",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 5",
        "coordinates": [
          -71.58720833333334,
          -16.328625
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-escuela-0",
        "scenarioId": "comunitario",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -71.586625,
          -16.326291666666666
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-escuela-1",
        "scenarioId": "comunitario",
        "type": "escuela",
        "name": "Escuela 2",
        "coordinates": [
          -71.58312500000001,
          -16.32454166666667
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-comercio_local-0",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -71.58195833333333,
          -16.326291666666666
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-comercio_local-1",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -71.58079166666667,
          -16.322791666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-comercio_local-2",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -71.58079166666667,
          -16.329208333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-comercio_local-3",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 4",
        "coordinates": [
          -71.58545833333334,
          -16.326291666666666
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-comercio_local-4",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 5",
        "coordinates": [
          -71.58545833333334,
          -16.323958333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-parada_transporte-0",
        "scenarioId": "comunitario",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -71.58720833333334,
          -16.325125
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      }
    ],
    "hibrido": [
      {
        "id": "arequipa-hibrido-road-h-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -71.584,
          -16.328041666666667
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.328041666666667
          ],
          [
            -71.5805,
            -16.328041666666667
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-road-h-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -71.584,
          -16.325708333333335
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.325708333333335
          ],
          [
            -71.5805,
            -16.325708333333335
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-road-h-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -71.584,
          -16.323375000000002
        ],
        "pathPoints": [
          [
            -71.5875,
            -16.323375000000002
          ],
          [
            -71.5805,
            -16.323375000000002
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-road-v-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -71.58604166666667,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58604166666667,
            -16.3295
          ],
          [
            -71.58604166666667,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-road-v-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -71.58370833333333,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58370833333333,
            -16.3295
          ],
          [
            -71.58370833333333,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-road-v-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -71.58137500000001,
          -16.326
        ],
        "pathPoints": [
          [
            -71.58137500000001,
            -16.3295
          ],
          [
            -71.58137500000001,
            -16.3225
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-0",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -71.58195833333333,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-1",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -71.58195833333333,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-2",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -71.58195833333333,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-3",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -71.58545833333334,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-4",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -71.58312500000001,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-5",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -71.58429166666667,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-6",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -71.58312500000001,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-7",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -71.584875,
          -16.325125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-8",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -71.58254166666667,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-9",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -71.584875,
          -16.329208333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-10",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -71.584875,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-11",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -71.58545833333334,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-12",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -71.58079166666667,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-13",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -71.58312500000001,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-14",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -71.58429166666667,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-15",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -71.58720833333334,
          -16.327458333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-16",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -71.58429166666667,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-17",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -71.58312500000001,
          -16.326291666666666
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-18",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -71.586625,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-19",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -71.58312500000001,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-20",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -71.58079166666667,
          -16.327458333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-21",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -71.58720833333334,
          -16.323958333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-22",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -71.58254166666667,
          -16.328625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-23",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 24",
        "coordinates": [
          -71.58429166666667,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-24",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 25",
        "coordinates": [
          -71.58195833333333,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-25",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -71.58720833333334,
          -16.326875
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-26",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 27",
        "coordinates": [
          -71.584875,
          -16.327458333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-27",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 28",
        "coordinates": [
          -71.584875,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-28",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 29",
        "coordinates": [
          -71.58079166666667,
          -16.32454166666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-29",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 30",
        "coordinates": [
          -71.58079166666667,
          -16.322791666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-0",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -71.58720833333334,
          -16.329208333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-1",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -71.58079166666667,
          -16.328625
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-2",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -71.58195833333333,
          -16.32454166666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-3",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -71.58254166666667,
          -16.326291666666666
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-4",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -71.58254166666667,
          -16.325125
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-5",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 6",
        "coordinates": [
          -71.584875,
          -16.32454166666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-6",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 7",
        "coordinates": [
          -71.58545833333334,
          -16.326291666666666
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-parque_verde-0",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -71.58545833333334,
          -16.328625
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-parque_verde-1",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -71.58079166666667,
          -16.325125
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-parque_verde-2",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -71.58545833333334,
          -16.327458333333333
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-parque_verde-3",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 4",
        "coordinates": [
          -71.58720833333334,
          -16.328625
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-parque_verde-4",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 5",
        "coordinates": [
          -71.58254166666667,
          -16.322791666666667
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-parque_verde-5",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 6",
        "coordinates": [
          -71.58195833333333,
          -16.329208333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-centro_salud-0",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -71.58720833333334,
          -16.32454166666667
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-centro_salud-1",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 2",
        "coordinates": [
          -71.58079166666667,
          -16.326291666666666
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-escuela-0",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -71.58429166666667,
          -16.329208333333334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-escuela-1",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 2",
        "coordinates": [
          -71.58720833333334,
          -16.325125
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 0,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-escuela-2",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 3",
        "coordinates": [
          -71.58429166666667,
          -16.326291666666666
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-comercio_local-0",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -71.58312500000001,
          -16.323958333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-comercio_local-1",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -71.584875,
          -16.328625
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-comercio_local-2",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -71.58254166666667,
          -16.329208333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-comercio_local-3",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 4",
        "coordinates": [
          -71.586625,
          -16.329208333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-comercio_local-4",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 5",
        "coordinates": [
          -71.586625,
          -16.322791666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-comercio_local-5",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 6",
        "coordinates": [
          -71.58429166666667,
          -16.325125
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-parada_transporte-0",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -71.586625,
          -16.326875
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-parada_transporte-1",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -71.58079166666667,
          -16.329208333333334
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-parada_transporte-2",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 3",
        "coordinates": [
          -71.58254166666667,
          -16.327458333333333
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "existente"
      }
    ],
    "custom_1": [],
    "custom_2": [],
    "custom_3": []
  },
  "trujillo": {
    "base": [
      {
        "id": "trujillo-base-road-h-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -79.0068,
          -8.083441666666667
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.083441666666667
          ],
          [
            -79.0033,
            -8.083441666666667
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-road-h-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -79.0068,
          -8.081108333333333
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.081108333333333
          ],
          [
            -79.0033,
            -8.081108333333333
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-road-h-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -79.0068,
          -8.078775
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.078775
          ],
          [
            -79.0033,
            -8.078775
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-road-v-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -79.00884166666667,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.00884166666667,
            -8.084900000000001
          ],
          [
            -79.00884166666667,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-road-v-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -79.00650833333333,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.00650833333333,
            -8.084900000000001
          ],
          [
            -79.00650833333333,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-road-v-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -79.004175,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.004175,
            -8.084900000000001
          ],
          [
            -79.004175,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-0",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -79.00767499999999,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-1",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -79.005925,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-2",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -79.00709166666667,
          -8.079358333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-3",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -79.00359166666667,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-4",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -79.00534166666667,
          -8.079941666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-5",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -79.01000833333333,
          -8.079941666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-6",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -79.00475833333333,
          -8.079941666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-7",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -79.00825833333333,
          -8.078191666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-8",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -79.009425,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-9",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -79.00475833333333,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-10",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -79.00534166666667,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-11",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -79.00825833333333,
          -8.079941666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-parque_verde-0",
        "scenarioId": "base",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -79.005925,
          -8.078191666666667
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-escuela-0",
        "scenarioId": "base",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -79.00825833333333,
          -8.084608333333334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-comercio_local-0",
        "scenarioId": "base",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -79.01000833333333,
          -8.081691666666668
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-comercio_local-1",
        "scenarioId": "base",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -79.005925,
          -8.079941666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-parada_transporte-0",
        "scenarioId": "base",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -79.00534166666667,
          -8.078191666666667
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "existente"
      }
    ],
    "municipal": [
      {
        "id": "trujillo-municipal-road-h-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -79.0068,
          -8.083441666666667
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.083441666666667
          ],
          [
            -79.0033,
            -8.083441666666667
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-h-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -79.0068,
          -8.081108333333333
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.081108333333333
          ],
          [
            -79.0033,
            -8.081108333333333
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-h-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -79.0068,
          -8.078775
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.078775
          ],
          [
            -79.0033,
            -8.078775
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-v-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -79.00884166666667,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.00884166666667,
            -8.084900000000001
          ],
          [
            -79.00884166666667,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-v-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -79.00650833333333,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.00650833333333,
            -8.084900000000001
          ],
          [
            -79.00650833333333,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-v-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -79.004175,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.004175,
            -8.084900000000001
          ],
          [
            -79.004175,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-0",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -79.005925,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-1",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -79.00767499999999,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-2",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -79.00475833333333,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-3",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -79.00767499999999,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-4",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -79.00359166666667,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-5",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -79.00709166666667,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-6",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -79.00825833333333,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-7",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -79.00475833333333,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-8",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -79.01000833333333,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-9",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -79.00767499999999,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-10",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -79.009425,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-11",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -79.009425,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-12",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -79.005925,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-13",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -79.009425,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-14",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -79.01000833333333,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-15",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -79.00475833333333,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-16",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -79.00359166666667,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-17",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -79.00534166666667,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-18",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -79.00534166666667,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-19",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -79.00475833333333,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-20",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -79.00534166666667,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-21",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -79.00534166666667,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_social-0",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -79.01000833333333,
          -8.078191666666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_social-1",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -79.009425,
          -8.079358333333333
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_social-2",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -79.00534166666667,
          -8.079358333333333
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_social-3",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -79.009425,
          -8.078191666666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_social-4",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -79.00767499999999,
          -8.082275000000001
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-parque_verde-0",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -79.00709166666667,
          -8.079941666666667
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-parque_verde-1",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -79.01000833333333,
          -8.079358333333333
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-parque_verde-2",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -79.00359166666667,
          -8.084608333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-centro_salud-0",
        "scenarioId": "municipal",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -79.00359166666667,
          -8.084025
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-escuela-0",
        "scenarioId": "municipal",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -79.00534166666667,
          -8.084025
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 0,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-comercio_local-0",
        "scenarioId": "municipal",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -79.005925,
          -8.084608333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-comercio_local-1",
        "scenarioId": "municipal",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -79.00709166666667,
          -8.084608333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-parada_transporte-0",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -79.01000833333333,
          -8.081691666666668
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-parada_transporte-1",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -79.00767499999999,
          -8.080525
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      }
    ],
    "comunitario": [
      {
        "id": "trujillo-comunitario-road-h-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -79.0068,
          -8.083441666666667
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.083441666666667
          ],
          [
            -79.0033,
            -8.083441666666667
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-road-h-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -79.0068,
          -8.081108333333333
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.081108333333333
          ],
          [
            -79.0033,
            -8.081108333333333
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-road-h-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -79.0068,
          -8.078775
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.078775
          ],
          [
            -79.0033,
            -8.078775
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-road-v-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -79.00884166666667,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.00884166666667,
            -8.084900000000001
          ],
          [
            -79.00884166666667,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-road-v-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -79.00650833333333,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.00650833333333,
            -8.084900000000001
          ],
          [
            -79.00650833333333,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-road-v-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -79.004175,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.004175,
            -8.084900000000001
          ],
          [
            -79.004175,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-0",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -79.01000833333333,
          -8.078191666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-1",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -79.00767499999999,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-2",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -79.009425,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-3",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -79.00534166666667,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-4",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -79.005925,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-5",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -79.00825833333333,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-6",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -79.00475833333333,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-7",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -79.01000833333333,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-8",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -79.00825833333333,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-9",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -79.00825833333333,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-10",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -79.00825833333333,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-11",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -79.00475833333333,
          -8.079941666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-12",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -79.00359166666667,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-13",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -79.005925,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-14",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -79.00709166666667,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-15",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -79.00359166666667,
          -8.079358333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-16",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -79.00709166666667,
          -8.079358333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-17",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -79.005925,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-18",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -79.00475833333333,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-19",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -79.00534166666667,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-20",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -79.01000833333333,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-21",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -79.00767499999999,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-22",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -79.00475833333333,
          -8.078191666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-23",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 24",
        "coordinates": [
          -79.005925,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-24",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 25",
        "coordinates": [
          -79.00709166666667,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-25",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -79.00359166666667,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-26",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 27",
        "coordinates": [
          -79.009425,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-0",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -79.00767499999999,
          -8.081691666666668
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-1",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -79.00825833333333,
          -8.082275000000001
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-2",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -79.005925,
          -8.078191666666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-3",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -79.00534166666667,
          -8.084608333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-4",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -79.00534166666667,
          -8.079941666666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-5",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 6",
        "coordinates": [
          -79.00767499999999,
          -8.079941666666667
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-parque_verde-0",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -79.00475833333333,
          -8.082275000000001
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-parque_verde-1",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -79.00825833333333,
          -8.082858333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-parque_verde-2",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -79.00475833333333,
          -8.082858333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-parque_verde-3",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 4",
        "coordinates": [
          -79.005925,
          -8.084025
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-parque_verde-4",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 5",
        "coordinates": [
          -79.00534166666667,
          -8.084025
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-escuela-0",
        "scenarioId": "comunitario",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -79.00359166666667,
          -8.082858333333334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-escuela-1",
        "scenarioId": "comunitario",
        "type": "escuela",
        "name": "Escuela 2",
        "coordinates": [
          -79.00359166666667,
          -8.079941666666667
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-comercio_local-0",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -79.009425,
          -8.084608333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-comercio_local-1",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -79.00709166666667,
          -8.081691666666668
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-comercio_local-2",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -79.00709166666667,
          -8.084608333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-comercio_local-3",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 4",
        "coordinates": [
          -79.00359166666667,
          -8.078191666666667
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-comercio_local-4",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 5",
        "coordinates": [
          -79.005925,
          -8.079358333333333
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-parada_transporte-0",
        "scenarioId": "comunitario",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -79.00767499999999,
          -8.078191666666667
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      }
    ],
    "hibrido": [
      {
        "id": "trujillo-hibrido-road-h-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 1",
        "coordinates": [
          -79.0068,
          -8.083441666666667
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.083441666666667
          ],
          [
            -79.0033,
            -8.083441666666667
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-h-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 2",
        "coordinates": [
          -79.0068,
          -8.081108333333333
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.081108333333333
          ],
          [
            -79.0033,
            -8.081108333333333
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-h-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Horizontal 3",
        "coordinates": [
          -79.0068,
          -8.078775
        ],
        "pathPoints": [
          [
            -79.0103,
            -8.078775
          ],
          [
            -79.0033,
            -8.078775
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-v-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 1",
        "coordinates": [
          -79.00884166666667,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.00884166666667,
            -8.084900000000001
          ],
          [
            -79.00884166666667,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-v-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 2",
        "coordinates": [
          -79.00650833333333,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.00650833333333,
            -8.084900000000001
          ],
          [
            -79.00650833333333,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-v-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Avenida Vertical 3",
        "coordinates": [
          -79.004175,
          -8.0814
        ],
        "pathPoints": [
          [
            -79.004175,
            -8.084900000000001
          ],
          [
            -79.004175,
            -8.0779
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 90,
        "ventilationScore": 90,
        "costEstimateUSD": 300000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-0",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -79.00767499999999,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-1",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -79.009425,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-2",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -79.005925,
          -8.079358333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-3",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -79.00475833333333,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-4",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -79.009425,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-5",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -79.00825833333333,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-6",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -79.00825833333333,
          -8.079358333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-7",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -79.00534166666667,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-8",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -79.00359166666667,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-9",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -79.00709166666667,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-10",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -79.00534166666667,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-11",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -79.00767499999999,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-12",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -79.009425,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-13",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -79.009425,
          -8.078191666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-14",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -79.00475833333333,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-15",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -79.01000833333333,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-16",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -79.00475833333333,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-17",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -79.00359166666667,
          -8.081691666666668
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-18",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -79.00475833333333,
          -8.082858333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-19",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -79.01000833333333,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-20",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -79.00767499999999,
          -8.078191666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-21",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -79.00825833333333,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-22",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -79.005925,
          -8.084608333333334
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-23",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 24",
        "coordinates": [
          -79.005925,
          -8.078191666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-24",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 25",
        "coordinates": [
          -79.00709166666667,
          -8.078191666666667
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-25",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -79.00709166666667,
          -8.079358333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-26",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 27",
        "coordinates": [
          -79.00709166666667,
          -8.084025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-27",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 28",
        "coordinates": [
          -79.00825833333333,
          -8.082275000000001
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-28",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 29",
        "coordinates": [
          -79.009425,
          -8.079358333333333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 90,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-29",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 30",
        "coordinates": [
          -79.01000833333333,
          -8.080525
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 0,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-0",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -79.00709166666667,
          -8.082275000000001
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-1",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -79.00359166666667,
          -8.082275000000001
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-2",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -79.00534166666667,
          -8.082858333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-3",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -79.00825833333333,
          -8.082858333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-4",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -79.00767499999999,
          -8.080525
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-5",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 6",
        "coordinates": [
          -79.00709166666667,
          -8.081691666666668
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-6",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 7",
        "coordinates": [
          -79.00709166666667,
          -8.084608333333334
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-parque_verde-0",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -79.00767499999999,
          -8.079941666666667
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-parque_verde-1",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -79.00534166666667,
          -8.079941666666667
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-parque_verde-2",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -79.009425,
          -8.084025
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-parque_verde-3",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 4",
        "coordinates": [
          -79.00825833333333,
          -8.079941666666667
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-parque_verde-4",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 5",
        "coordinates": [
          -79.005925,
          -8.082275000000001
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-parque_verde-5",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 6",
        "coordinates": [
          -79.00359166666667,
          -8.084608333333334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-centro_salud-0",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -79.00767499999999,
          -8.081691666666668
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 0,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-centro_salud-1",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 2",
        "coordinates": [
          -79.00475833333333,
          -8.079358333333333
        ],
        "footprintArea": 2000,
        "floors": 3,
        "heightMeters": 10,
        "unitsCount": 0,
        "populationCapacity": 1500,
        "solarOrientation": 90,
        "ventilationScore": 85,
        "costEstimateUSD": 2500000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-escuela-0",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -79.00475833333333,
          -8.079941666666667
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-escuela-1",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 2",
        "coordinates": [
          -79.00475833333333,
          -8.081691666666668
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 90,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-escuela-2",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 3",
        "coordinates": [
          -79.00767499999999,
          -8.079358333333333
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 0,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-comercio_local-0",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -79.00534166666667,
          -8.084608333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-comercio_local-1",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -79.00709166666667,
          -8.082858333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-comercio_local-2",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -79.00534166666667,
          -8.079358333333333
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-comercio_local-3",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 4",
        "coordinates": [
          -79.00475833333333,
          -8.084025
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-comercio_local-4",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 5",
        "coordinates": [
          -79.005925,
          -8.082858333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 90,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-comercio_local-5",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 6",
        "coordinates": [
          -79.01000833333333,
          -8.082858333333334
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 0,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-parada_transporte-0",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -79.00767499999999,
          -8.082858333333334
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-parada_transporte-1",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -79.00534166666667,
          -8.078191666666667
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 0,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-parada_transporte-2",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 3",
        "coordinates": [
          -79.009425,
          -8.079941666666667
        ],
        "footprintArea": 300,
        "floors": 1,
        "heightMeters": 4,
        "unitsCount": 0,
        "populationCapacity": 3000,
        "solarOrientation": 90,
        "ventilationScore": 100,
        "costEstimateUSD": 50000,
        "status": "propuesto"
      }
    ],
    "custom_1": [],
    "custom_2": [],
    "custom_3": []
  }
};

export const INITIAL_FORUM_THREADS: ForumThread[] = [
  {
    id: 'th-1',
    author: 'Junta Vecinal Lomas',
    role: 'comunidad',
    title: 'Ubicación del nuevo Parque y Huerto Urbano',
    content: 'Proponemos ubicar el gran parque en la zona norte donde el suelo es más estable. Además, ayuda a contener los deslizamientos y mejora la temperatura local.',
    timestamp: 'Hace 2 horas',
    votes: 42,
    comments: 12
  },
  {
    id: 'th-2',
    author: 'Urbanista Muni',
    role: 'municipalidad',
    title: 'Viabilidad de Vías Principales',
    content: 'Técnicamente necesitamos concentrar la inversión vial en el eje troncal para garantizar acceso al transporte masivo.',
    timestamp: 'Hace 5 horas',
    votes: 28,
    comments: 8
  },
  {
    id: 'th-3',
    author: 'Colectivo Ambiental',
    role: 'experto',
    title: 'Materialidad y Confort Térmico',
    content: 'Es clave usar arquitectura vernácula (sillar / tierra compactada) en lugar de tanto concreto para evitar la isla de calor.',
    timestamp: 'Ayer',
    votes: 35,
    comments: 5
  }
];

export const INITIAL_BUDGET_ALLOCATION: BudgetVoteAllocation = {
  vivienda_social: 30,
  espacio_publico: 25,
  infraestructura_vial: 20,
  equipamiento_servicios: 25
};

export const INITIAL_SCENARIOS_META: Record<ScenarioType, { name: string; shortDesc: string; author: string }> = {
  base: {
    name: '1. Base (Actual)',
    shortDesc: 'Situación original extraída de satélite GHSL y OSM.',
    author: 'AI Studio Data Hub'
  },
  municipal: {
    name: '2. Municipal',
    shortDesc: 'Enfoque técnico top-down priorizando densidad vial y vivienda.',
    author: 'Sec. Planificación'
  },
  comunitario: {
    name: '3. Comunitaria',
    shortDesc: 'Enfoque vecinal priorizando ecología, huertos y centros sociales.',
    author: 'Junta de Vecinos'
  },
  hibrido: {
    name: '4. Híbrido (Co-Diseño)',
    shortDesc: 'Resolución AHP óptima equilibrando rentabilidad y equidad espacial.',
    author: 'Algoritmo AHP/ELECTRE'
  },
  custom_1: {
    name: 'Perfil Propuesta 1',
    shortDesc: 'Propuesta personalizada de co-diseño.',
    author: 'Usuario'
  },
  custom_2: {
    name: 'Perfil Propuesta 2',
    shortDesc: 'Propuesta personalizada de co-diseño.',
    author: 'Usuario'
  },
  custom_3: {
    name: 'Perfil Propuesta 3',
    shortDesc: 'Propuesta personalizada de co-diseño.',
    author: 'Usuario'
  }
};

export const INITIAL_AHP_CRITERIA = [
  { name: 'Costo' },
  { name: 'Impacto Social' },
  { name: 'Ecología' },
  { name: 'Transporte' },
  { name: 'Densidad' }
] as any[];

export const INITIAL_AHP_MATRIX = [
  [1, 1/3, 5, 2, 4],
  [3, 1, 7, 3, 5],
  [1/5, 1/7, 1, 1/3, 1/2],
  [1/2, 1/3, 3, 1, 2],
  [1/4, 1/5, 2, 1/2, 1]
];
