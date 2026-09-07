import { ScenarioType, UrbanElement, ForumThread, BudgetVoteAllocation, PilotCityId } from '../types';

export const INITIAL_CITY_ELEMENTS: Record<PilotCityId, Record<string, UrbanElement[]>> = {
  "lima": {
    "base": [
      {
        "id": "lima-base-road-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -76.9947420388481,
          -11.98605921818049
        ],
        "pathPoints": [
          [
            -76.996542,
            -11.986059
          ],
          [
            -76.995342,
            -11.985959
          ],
          [
            -76.994142,
            -11.986159
          ],
          [
            -76.992942,
            -11.986059
          ],
          [
            -76.99457319637648,
            -11.986622488557638
          ],
          [
            -76.99432993444219,
            -11.986227652959686
          ],
          [
            -76.99386462018981,
            -11.985250528918138
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 3000,
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
        "id": "lima-base-road-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -76.99348851580899,
          -11.98259576048916
        ],
        "pathPoints": [
          [
            -76.994826,
            -11.9838
          ],
          [
            -76.993934,
            -11.982897
          ],
          [
            -76.993043,
            -11.982294
          ],
          [
            -76.992151,
            -11.981391
          ],
          [
            -76.99304409632707,
            -11.982526930439025
          ],
          [
            -76.99327051330437,
            -11.982994700470954
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "existente"
      },
      {
        "id": "lima-base-road-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -76.99061337657378,
          -11.983601338789205
        ],
        "pathPoints": [
          [
            -76.990802,
            -11.985391
          ],
          [
            -76.990676,
            -11.984098
          ],
          [
            -76.990551,
            -11.983105
          ],
          [
            -76.990425,
            -11.981811
          ],
          [
            -76.98980312221246,
            -11.983934017392547
          ],
          [
            -76.9893830627603,
            -11.984552995236871
          ],
          [
            -76.99001940112939,
            -11.983916605847945
          ],
          [
            -76.99055606429964,
            -11.984121347708234
          ],
          [
            -76.99163632346234,
            -11.983873237895299
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "existente"
      },
      {
        "id": "lima-base-vivienda_incremental-0",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -76.99618925111623,
          -11.982709738747378
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99354631397028,
          -11.982654421520534
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99298847036137,
          -11.984208219452832
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99384337390873,
          -11.98707934803838
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99068681995774,
          -11.988667481258245
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99193428471092,
          -11.983024239888781
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99675244813771,
          -11.984093853964028
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99441831993882,
          -11.98777064329285
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99195345354592,
          -11.985247752216926
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99496410192441,
          -11.983519079529165
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.99407948758171,
          -11.989084232183737
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.992237308553,
          -11.988101141572294
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 72,
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
          -76.9951534466643,
          -11.982800391953566
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99668827579114,
          -11.984024318756992
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -76.99125376464269,
          -11.989491741197428
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 288,
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
          -76.99356381059593,
          -11.985946195324239
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 288,
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
          -76.9940398800444,
          -11.983948071234328
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
        "id": "lima-municipal-road-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -76.99634819879182,
          -11.989488135691309
        ],
        "pathPoints": [
          [
            -76.99529,
            -11.990944
          ],
          [
            -76.995996,
            -11.989874
          ],
          [
            -76.996701,
            -11.989103
          ],
          [
            -76.997406,
            -11.988032
          ],
          [
            -76.99599623864714,
            -11.989413355752266
          ],
          [
            -76.99652049841839,
            -11.990099635372484
          ],
          [
            -76.99650726047854,
            -11.990137132390787
          ],
          [
            -76.996426219336,
            -11.989177441672172
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
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-road-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -76.99682214916876,
          -11.985611665083193
        ],
        "pathPoints": [
          [
            -76.995061,
            -11.985986
          ],
          [
            -76.996235,
            -11.985636
          ],
          [
            -76.997409,
            -11.985587
          ],
          [
            -76.998583,
            -11.985237
          ],
          [
            -76.99779369928342,
            -11.985534492924467
          ],
          [
            -76.99793946615823,
            -11.984809501581807
          ],
          [
            -76.99730458695298,
            -11.985743539682941
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 3000,
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
        "id": "lima-municipal-road-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -76.99282855376597,
          -11.983968411381095
        ],
        "pathPoints": [
          [
            -76.99127,
            -11.983068
          ],
          [
            -76.992309,
            -11.983568
          ],
          [
            -76.993348,
            -11.984368
          ],
          [
            -76.994387,
            -11.984868
          ],
          [
            -76.99326968995918,
            -11.984836530209082
          ],
          [
            -76.9926381824969,
            -11.984674183799143
          ],
          [
            -76.9922426880757,
            -11.985363649941458
          ],
          [
            -76.99196125862396,
            -11.986340733179102
          ],
          [
            -76.99111015482593,
            -11.987307733543417
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-road-3",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -76.99091902768431,
          -11.988036298854752
        ],
        "pathPoints": [
          [
            -76.990363,
            -11.986324
          ],
          [
            -76.990734,
            -11.987366
          ],
          [
            -76.991104,
            -11.988707
          ],
          [
            -76.991475,
            -11.989748
          ],
          [
            -76.99090174191151,
            -11.988708648361378
          ],
          [
            -76.99021017888577,
            -11.987609748593613
          ],
          [
            -76.99051952635688,
            -11.987222804086917
          ],
          [
            -76.98957469079171,
            -11.986521597421365
          ],
          [
            -76.99001624479146,
            -11.986813288047802
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-road-4",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 5",
        "coordinates": [
          -76.99621747130583,
          -11.98889628237166
        ],
        "pathPoints": [
          [
            -76.99695,
            -11.987252
          ],
          [
            -76.996462,
            -11.988248
          ],
          [
            -76.995973,
            -11.989544
          ],
          [
            -76.995485,
            -11.990541
          ],
          [
            -76.9967304740514,
            -11.988203517459892
          ],
          [
            -76.99560773461403,
            -11.989185747846662
          ],
          [
            -76.99585691684543,
            -11.989719722236833
          ],
          [
            -76.99554877241505,
            -11.989693839432931
          ],
          [
            -76.99632309169084,
            -11.989136343617444
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-0",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -76.99360561503235,
          -11.986454397620063
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-1",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -76.99619202478019,
          -11.983458433242284
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-2",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -76.99051651040988,
          -11.988255980457113
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99513247906171,
          -11.982545325593453
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99547158352064,
          -11.986718909166942
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99420620539532,
          -11.98925373539416
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99261750401934,
          -11.985140869503237
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99421146285127,
          -11.98898724469936
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99149092666038,
          -11.987523911529195
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-9",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -76.99296964068559,
          -11.987723476507693
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-10",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -76.99656137574101,
          -11.988210841524872
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.9956340446669,
          -11.988012139264427
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99070618808973,
          -11.987715635977107
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-13",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -76.99121918717307,
          -11.989438820534176
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99551314632733,
          -11.98299533069698
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-15",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -76.99681560141065,
          -11.987753886194794
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99098550753658,
          -11.986643616528049
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99670787554936,
          -11.982728546247674
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_incremental-18",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -76.99553781295819,
          -11.984448568804675
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_incremental-19",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -76.99229579380972,
          -11.982925551386865
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99516876252116,
          -11.987183451050866
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99223941631065,
          -11.98392548618099
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 101,
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
          -76.99392377891706,
          -11.985731275220353
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 223,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_social-1",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -76.99429042454392,
          -11.986728889330971
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 223,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-vivienda_social-2",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -76.99644571311951,
          -11.983571598669064
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 223,
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
          -76.99409240671224,
          -11.98765770435813
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 223,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-vivienda_social-4",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -76.99432012865908,
          -11.984686836821345
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 223,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-parque_verde-0",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -76.99234091918049,
          -11.986424270880427
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99446590557184,
          -11.98349738604902
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-parque_verde-2",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -76.9943241506176,
          -11.98393243217792
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "lima-municipal-centro_salud-0",
        "scenarioId": "municipal",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -76.99212540958737,
          -11.985679425908815
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
        "id": "lima-municipal-escuela-0",
        "scenarioId": "municipal",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -76.99127020348415,
          -11.988587488010465
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "lima-municipal-comercio_local-0",
        "scenarioId": "municipal",
        "type": "comercio_local",
        "name": "Comercio Local 1",
        "coordinates": [
          -76.99272091076574,
          -11.986026693663716
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 327,
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
          -76.99281179864826,
          -11.988516709167527
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 327,
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
          -76.99527255201724,
          -11.988937324872262
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
        "id": "lima-municipal-parada_transporte-1",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -76.9907536589507,
          -11.985840404103591
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
        "id": "lima-comunitario-road-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -76.99448242011302,
          -11.983141459304484
        ],
        "pathPoints": [
          [
            -76.996127,
            -11.982409
          ],
          [
            -76.995031,
            -11.982797
          ],
          [
            -76.993934,
            -11.983486
          ],
          [
            -76.992838,
            -11.983874
          ],
          [
            -76.99430227455576,
            -11.982817849541629
          ],
          [
            -76.99462339799811,
            -11.982500355802564
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-road-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -76.99364704495333,
          -11.989237040905907
        ],
        "pathPoints": [
          [
            -76.995359,
            -11.989793
          ],
          [
            -76.994218,
            -11.989322
          ],
          [
            -76.993076,
            -11.989152
          ],
          [
            -76.991935,
            -11.988681
          ],
          [
            -76.99336346126216,
            -11.988874528873188
          ],
          [
            -76.99381587269184,
            -11.988864675418405
          ],
          [
            -76.99306937776925,
            -11.988115070614027
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 3000,
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
        "id": "lima-comunitario-road-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -76.99608293382568,
          -11.98571940390022
        ],
        "pathPoints": [
          [
            -76.996983,
            -11.987278
          ],
          [
            -76.996383,
            -11.986139
          ],
          [
            -76.995783,
            -11.9853
          ],
          [
            -76.995183,
            -11.984161
          ],
          [
            -76.99659716770306,
            -11.986314193298147
          ],
          [
            -76.99566074478426,
            -11.9856510327969
          ],
          [
            -76.9964603219342,
            -11.985251843282608
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 3000,
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
        "id": "lima-comunitario-road-3",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -76.9915589297634,
          -11.984955295390778
        ],
        "pathPoints": [
          [
            -76.991185,
            -11.986716
          ],
          [
            -76.991434,
            -11.985442
          ],
          [
            -76.991684,
            -11.984468
          ],
          [
            -76.991933,
            -11.983195
          ],
          [
            -76.9921264847424,
            -11.985818643323194
          ],
          [
            -76.9915714545547,
            -11.985574536426366
          ],
          [
            -76.9908040340792,
            -11.986718695819198
          ],
          [
            -76.99013460450465,
            -11.986304153231552
          ],
          [
            -76.99057015791912,
            -11.98681380839092
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-0",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -76.99579037818407,
          -11.989189201832602
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99291601091859,
          -11.984431834267076
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99566808283136,
          -11.98492481007135
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99221761181764,
          -11.985173990673315
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99418025296416,
          -11.985332281504451
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99591007743089,
          -11.98714249234884
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-6",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -76.99221636097951,
          -11.986094180325567
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-7",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -76.99589148677963,
          -11.98902085040459
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99385154009903,
          -11.988182489150025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99342187814295,
          -11.988024015722567
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99253728416939,
          -11.987340422641067
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99590291094857,
          -11.984025028325926
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99446425375116,
          -11.988762064158333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99393144130958,
          -11.989277531195643
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-14",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -76.9904506904145,
          -11.986766664261713
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.9938012572349,
          -11.984324294686735
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99065200118145,
          -11.985228343866218
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99662306589072,
          -11.984912859573917
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-18",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -76.9938663543513,
          -11.989167704064881
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99172047456001,
          -11.986442101990555
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99650514372748,
          -11.988684596354473
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-21",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -76.99195906228798,
          -11.989156004791214
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99488847796863,
          -11.983481170007044
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-23",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 24",
        "coordinates": [
          -76.99277511513642,
          -11.986599206318422
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99440889774552,
          -11.982921676647228
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-25",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -76.9951478531408,
          -11.985985579144968
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_incremental-26",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 27",
        "coordinates": [
          -76.99517255982889,
          -11.984484108241704
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 304,
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
          -76.99633018863464,
          -11.986259880577785
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -76.9967353486953,
          -11.985013065646129
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_social-2",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -76.99093380238317,
          -11.986796677057276
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-comunitario-vivienda_social-3",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -76.99479251246186,
          -11.982571478514728
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -76.99048721859111,
          -11.984527201086896
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -76.9927555442428,
          -11.987645339060053
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -76.99455109032432,
          -11.982845681622992
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99517305550776,
          -11.988386867096334
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99267107989003,
          -11.985912550815723
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-parque_verde-3",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 4",
        "coordinates": [
          -76.99485470180178,
          -11.985989833270073
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99158983538027,
          -11.984748487037766
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99322548693269,
          -11.984081751387269
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -76.99404869486368,
          -11.984977097530125
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -76.99336926993091,
          -11.983535355870686
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 251,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-comercio_local-1",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -76.99213463378527,
          -11.989476326484535
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 251,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-comercio_local-2",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -76.99287941861262,
          -11.985302693330256
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 251,
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
          -76.99686126237101,
          -11.984017499634719
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 251,
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
          -76.99694039347943,
          -11.984946659178412
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 251,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-comunitario-parada_transporte-0",
        "scenarioId": "comunitario",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -76.99126207471643,
          -11.986405662181662
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
        "id": "lima-hibrido-road-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -76.99115543662107,
          -11.986792682203076
        ],
        "pathPoints": [
          [
            -76.989699,
            -11.987851
          ],
          [
            -76.99067,
            -11.987045
          ],
          [
            -76.991641,
            -11.98654
          ],
          [
            -76.992612,
            -11.985735
          ],
          [
            -76.99031183480038,
            -11.986122979945492
          ],
          [
            -76.98950430496876,
            -11.9852096582628
          ],
          [
            -76.98948461722838,
            -11.98556920080308
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 3000,
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
        "id": "lima-hibrido-road-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -76.99157829306012,
          -11.98812318983476
        ],
        "pathPoints": [
          [
            -76.989788,
            -11.987935
          ],
          [
            -76.990982,
            -11.98796
          ],
          [
            -76.992175,
            -11.988286
          ],
          [
            -76.993368,
            -11.988311
          ],
          [
            -76.99165094567209,
            -11.9869743452521
          ],
          [
            -76.99145808437244,
            -11.987191364290139
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-road-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -76.99147751117165,
          -11.986768043147329
        ],
        "pathPoints": [
          [
            -76.990273,
            -11.98543
          ],
          [
            -76.991076,
            -11.986222
          ],
          [
            -76.991879,
            -11.987314
          ],
          [
            -76.992682,
            -11.988106
          ],
          [
            -76.99120043421124,
            -11.986566139173515
          ],
          [
            -76.99179744883564,
            -11.985704822880805
          ],
          [
            -76.99089064069396,
            -11.985264645763483
          ],
          [
            -76.99074268621675,
            -11.985392839808235
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
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-road-3",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -76.99052103778858,
          -11.98898710611031
        ],
        "pathPoints": [
          [
            -76.990521,
            -11.987187
          ],
          [
            -76.990521,
            -11.988287
          ],
          [
            -76.990521,
            -11.989687
          ],
          [
            -76.990521,
            -11.990787
          ],
          [
            -76.99058503474058,
            -11.98976241331603
          ],
          [
            -76.98975440170624,
            -11.989776727572925
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-road-4",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 5",
        "coordinates": [
          -76.99293752812194,
          -11.985952356945734
        ],
        "pathPoints": [
          [
            -76.994142,
            -11.984615
          ],
          [
            -76.993339,
            -11.985406
          ],
          [
            -76.992536,
            -11.986498
          ],
          [
            -76.991733,
            -11.98729
          ],
          [
            -76.99302762232287,
            -11.986667492345706
          ],
          [
            -76.99259226859265,
            -11.987132898852481
          ],
          [
            -76.9915942091847,
            -11.986673849328636
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "lima-hibrido-road-5",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 6",
        "coordinates": [
          -76.99201297008611,
          -11.983161081940096
        ],
        "pathPoints": [
          [
            -76.993803,
            -11.982973
          ],
          [
            -76.99261,
            -11.982998
          ],
          [
            -76.991416,
            -11.983324
          ],
          [
            -76.990223,
            -11.983349
          ],
          [
            -76.99126771283908,
            -11.98222382625216
          ],
          [
            -76.99132958082573,
            -11.982878919501353
          ],
          [
            -76.99037233326669,
            -11.981781296982453
          ],
          [
            -76.98955403300013,
            -11.981818380788317
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
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-0",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -76.99338171180126,
          -11.986979637427012
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99471727837204,
          -11.988668085310282
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99169794491893,
          -11.989489804090464
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99176895787214,
          -11.988078188144515
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99099212678341,
          -11.982904052361755
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99261322196222,
          -11.985022013531353
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99159380473888,
          -11.98697071657307
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-7",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -76.99425554796264,
          -11.984488667113395
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-8",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -76.99117814844416,
          -11.986397989027175
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99107195778502,
          -11.982548223114254
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.9935615693804,
          -11.983035637353408
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99203202765605,
          -11.984575882314603
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99672398035192,
          -11.983548400953703
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99448032845552,
          -11.984144947219463
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99221697745405,
          -11.983278148522944
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-15",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -76.99190904548938,
          -11.986135413099264
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99470914273253,
          -11.985147964140017
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99135638562294,
          -11.987866099925162
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-18",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -76.99682241981591,
          -11.987750624815657
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99110305578046,
          -11.986360653724333
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-20",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -76.99619831158186,
          -11.9874964925931
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99152679374673,
          -11.985880504147048
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-22",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -76.99425759585004,
          -11.98295825772543
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99026061061393,
          -11.985738251666966
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99226294534596,
          -11.987477016769914
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-25",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -76.99142881360561,
          -11.989303888430008
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.9949071532546,
          -11.989136073814393
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.9926474081525,
          -11.983503508053305
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
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
          -76.99148181230211,
          -11.984962250344015
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_incremental-29",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 30",
        "coordinates": [
          -76.99289664310234,
          -11.985625638586567
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 259,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_social-0",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -76.99429000365025,
          -11.983398617108623
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 128,
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
          -76.99301068568681,
          -11.982901520409008
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 128,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_social-2",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -76.99316554853601,
          -11.988425865235147
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 128,
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
          -76.99227940878632,
          -11.987246685335338
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 128,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-vivienda_social-4",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -76.99272757122378,
          -11.986509718533624
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 128,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_social-5",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 6",
        "coordinates": [
          -76.99070830832902,
          -11.986837486866134
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 128,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-vivienda_social-6",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 7",
        "coordinates": [
          -76.9937183558392,
          -11.984116971265843
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 128,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-parque_verde-0",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -76.9960070764291,
          -11.98314420912652
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99677373866164,
          -11.982986118098365
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99236012740631,
          -11.987685303400044
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99175736994464,
          -11.984303478402005
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -76.99116371472432,
          -11.986711711119346
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-parque_verde-5",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 6",
        "coordinates": [
          -76.99098996558364,
          -11.986970795449578
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-centro_salud-0",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -76.99425362143117,
          -11.989406833751534
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
          -76.99235264369567,
          -11.982696028636685
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
          -76.99446537832655,
          -11.98360017769913
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-escuela-1",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 2",
        "coordinates": [
          -76.99394354969353,
          -11.987959467538145
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-escuela-2",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 3",
        "coordinates": [
          -76.99535874840042,
          -11.98763557514957
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -76.99447459189176,
          -11.989011808377326
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 88,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-comercio_local-1",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -76.99082322448417,
          -11.9857178408797
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 88,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-comercio_local-2",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -76.99306323336894,
          -11.982690419394123
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 88,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "lima-hibrido-comercio_local-3",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 4",
        "coordinates": [
          -76.99244474963054,
          -11.98527989300026
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 88,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-comercio_local-4",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 5",
        "coordinates": [
          -76.99045726954466,
          -11.984389038898684
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 88,
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
          -76.99605019151176,
          -11.985930341125488
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 88,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "lima-hibrido-parada_transporte-0",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -76.99228845539315,
          -11.988741037127104
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
        "id": "lima-hibrido-parada_transporte-1",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -76.99654320462656,
          -11.988822604627323
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
        "id": "lima-hibrido-parada_transporte-2",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 3",
        "coordinates": [
          -76.99530473986516,
          -11.986660777598047
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
  "arequipa": {
    "base": [
      {
        "id": "arequipa-base-road-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -71.58186400389522,
          -16.323504432062247
        ],
        "pathPoints": [
          [
            -71.58332,
            -16.324562
          ],
          [
            -71.582349,
            -16.323757
          ],
          [
            -71.581379,
            -16.323252
          ],
          [
            -71.580408,
            -16.322446
          ],
          [
            -71.58197939166796,
            -16.323207524359674
          ],
          [
            -71.58163222043201,
            -16.323089471051105
          ],
          [
            -71.58087655338997,
            -16.32372053845595
          ],
          [
            -71.58025214847395,
            -16.324313875703016
          ],
          [
            -71.57916494261252,
            -16.325455549921482
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-road-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -71.58295048457859,
          -16.32387884105951
        ],
        "pathPoints": [
          [
            -71.583325,
            -16.32564
          ],
          [
            -71.583075,
            -16.324366
          ],
          [
            -71.582826,
            -16.323392
          ],
          [
            -71.582576,
            -16.322118
          ],
          [
            -71.58267399889742,
            -16.323415842330512
          ],
          [
            -71.5820837531553,
            -16.323266274520186
          ],
          [
            -71.58295273709707,
            -16.32387299803243
          ],
          [
            -71.58246778505975,
            -16.323666720469376
          ],
          [
            -71.5834154988867,
            -16.323141613820376
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "existente"
      },
      {
        "id": "arequipa-base-road-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -71.58568988090832,
          -16.328715762494802
        ],
        "pathPoints": [
          [
            -71.58479,
            -16.330275
          ],
          [
            -71.58539,
            -16.329135
          ],
          [
            -71.58599,
            -16.328296
          ],
          [
            -71.58659,
            -16.327157
          ],
          [
            -71.58658897599427,
            -16.328613748932323
          ],
          [
            -71.58709794656971,
            -16.32957385745716
          ],
          [
            -71.58707805174004,
            -16.329177525923484
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "arequipa-base-vivienda_incremental-0",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -71.58124045581815,
          -16.326508228631965
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58589670003677,
          -16.32917850953141
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58209624735132,
          -16.326487636639186
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58470088736647,
          -16.322979749049047
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.5857354020493,
          -16.325885962704252
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58251440320687,
          -16.32253588716981
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58454560148597,
          -16.326477683675638
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.5847959232764,
          -16.326379096215692
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.5871699539675,
          -16.32653790527552
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58058068474516,
          -16.327543156281262
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58302818862367,
          -16.32540848075034
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58642632717172,
          -16.32279427886431
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.5806120768621,
          -16.329425995428572
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58517019477915,
          -16.326045445663457
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -71.58336929132989,
          -16.327054600343928
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 24,
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
          -71.58510183963713,
          -16.32352938785427
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 24,
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
          -71.58074569364057,
          -16.32299877998035
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
        "id": "arequipa-municipal-road-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -71.58113690213804,
          -16.32942698762238
        ],
        "pathPoints": [
          [
            -71.579425,
            -16.329983
          ],
          [
            -71.580566,
            -16.329512
          ],
          [
            -71.581708,
            -16.329342
          ],
          [
            -71.582849,
            -16.328871
          ],
          [
            -71.58124548775469,
            -16.329391687130588
          ],
          [
            -71.58196290883227,
            -16.33047199731082
          ],
          [
            -71.58093951542057,
            -16.331323477953518
          ],
          [
            -71.58041834516392,
            -16.3322022849175
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
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -71.58120581673774,
          -16.324661221666712
        ],
        "pathPoints": [
          [
            -71.579561,
            -16.323929
          ],
          [
            -71.580658,
            -16.324317
          ],
          [
            -71.581754,
            -16.325005
          ],
          [
            -71.58285,
            -16.325393
          ],
          [
            -71.58012984738512,
            -16.32374152655635
          ],
          [
            -71.58063707212452,
            -16.32460862068216
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -71.58742348136312,
          -16.32835790371395
        ],
        "pathPoints": [
          [
            -71.586691,
            -16.326714
          ],
          [
            -71.587179,
            -16.32771
          ],
          [
            -71.587668,
            -16.329006
          ],
          [
            -71.588156,
            -16.330002
          ],
          [
            -71.58791424809705,
            -16.329106857538925
          ],
          [
            -71.58786869748624,
            -16.32827733799627
          ],
          [
            -71.58783655671355,
            -16.328731554809508
          ],
          [
            -71.58721548858317,
            -16.327810560645542
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
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-3",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -71.58150267136529,
          -16.328208011225186
        ],
        "pathPoints": [
          [
            -71.582059,
            -16.326496
          ],
          [
            -71.581688,
            -16.327537
          ],
          [
            -71.581317,
            -16.328879
          ],
          [
            -71.580946,
            -16.32992
          ],
          [
            -71.58187894070805,
            -16.3270868535695
          ],
          [
            -71.58258332915375,
            -16.327377218286475
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-road-4",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 5",
        "coordinates": [
          -71.58333048165461,
          -16.326142813313606
        ],
        "pathPoints": [
          [
            -71.584889,
            -16.325243
          ],
          [
            -71.58385,
            -16.325743
          ],
          [
            -71.582811,
            -16.326543
          ],
          [
            -71.581772,
            -16.327043
          ],
          [
            -71.58422488902248,
            -16.326208998568053
          ],
          [
            -71.58342951459441,
            -16.326215719957037
          ],
          [
            -71.58294304704211,
            -16.32555217951119
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "arequipa-municipal-vivienda_incremental-0",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -71.58726781109691,
          -16.325793541066172
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-1",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -71.58675483129785,
          -16.325299022133557
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.5874489557913,
          -16.325054643952367
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-3",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -71.58699871878689,
          -16.32483991868478
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-4",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -71.58596631193114,
          -16.328879354915067
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58500594172405,
          -16.322834465359854
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-6",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -71.58053298204275,
          -16.325850672225297
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-7",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -71.58619297225962,
          -16.32685138144492
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-8",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 9",
        "coordinates": [
          -71.58189317407937,
          -16.326427283260433
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58398664842207,
          -16.32692040823537
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58305844121955,
          -16.327976501037952
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58267311800545,
          -16.324908279064537
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-12",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -71.58448861100364,
          -16.324765815418218
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.5848542359041,
          -16.326369751379964
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58423818855454,
          -16.32653674104578
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.5816145083462,
          -16.326455731576395
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-16",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -71.58553853653024,
          -16.323268174678166
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-17",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -71.58484064528066,
          -16.323541988151195
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-vivienda_incremental-18",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -71.58279225561719,
          -16.323884864254993
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58227319967214,
          -16.32511529742998
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58568500033255,
          -16.326213295069625
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58084907512409,
          -16.325345132611062
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 77,
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
          -71.58694980360941,
          -16.326558360243972
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 35,
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
          -71.58410217155776,
          -16.326870186480154
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 35,
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
          -71.58246054205263,
          -16.326222141910872
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 35,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-vivienda_social-3",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -71.5851679212538,
          -16.326278414073375
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 35,
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
          -71.58272851284275,
          -16.326373917669805
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 35,
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
          -71.58669792634915,
          -16.327314827174558
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-parque_verde-1",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -71.58218689655386,
          -16.3248726347541
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58396451816982,
          -16.32564118225624
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58700887098124,
          -16.32496002323728
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
          -71.5838935218896,
          -16.325491374142068
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -71.58657770830403,
          -16.32406810982199
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 298,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-municipal-comercio_local-1",
        "scenarioId": "municipal",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -71.58593981196358,
          -16.327304195279964
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 298,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "arequipa-municipal-parada_transporte-0",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -71.58727353696095,
          -16.326618079793118
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
        "id": "arequipa-municipal-parada_transporte-1",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -71.58668241832231,
          -16.325502040041606
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
        "id": "arequipa-comunitario-road-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -71.58406818411133,
          -16.322562469380284
        ],
        "pathPoints": [
          [
            -71.585829,
            -16.322937
          ],
          [
            -71.584655,
            -16.322587
          ],
          [
            -71.583481,
            -16.322538
          ],
          [
            -71.582308,
            -16.322188
          ],
          [
            -71.58519241066769,
            -16.32332498019063
          ],
          [
            -71.58514587347682,
            -16.322940682617347
          ],
          [
            -71.5847637178324,
            -16.32369960486452
          ],
          [
            -71.58371299605874,
            -16.324022543521586
          ],
          [
            -71.58382440941769,
            -16.32390159459372
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-road-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -71.5823483650076,
          -16.322835432057087
        ],
        "pathPoints": [
          [
            -71.583406,
            -16.324292
          ],
          [
            -71.582701,
            -16.323221
          ],
          [
            -71.581996,
            -16.32245
          ],
          [
            -71.58129,
            -16.321379
          ],
          [
            -71.58240641421627,
            -16.322314858273028
          ],
          [
            -71.58257798142797,
            -16.32272075331946
          ],
          [
            -71.58371738995048,
            -16.321767846907203
          ],
          [
            -71.58397503115596,
            -16.321877066141266
          ],
          [
            -71.5848773648807,
            -16.322997872439743
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-road-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -71.58330906834881,
          -16.32937555577548
        ],
        "pathPoints": [
          [
            -71.583121,
            -16.331166
          ],
          [
            -71.583246,
            -16.329872
          ],
          [
            -71.583372,
            -16.328879
          ],
          [
            -71.583497,
            -16.327585
          ],
          [
            -71.5830916403995,
            -16.32915520289111
          ],
          [
            -71.5832858197449,
            -16.33029310472935
          ],
          [
            -71.58245164658733,
            -16.33007904155447
          ],
          [
            -71.58256796259813,
            -16.33108171304579
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-road-3",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -71.58197101984871,
          -16.322701933234388
        ],
        "pathPoints": [
          [
            -71.580633,
            -16.323906
          ],
          [
            -71.581525,
            -16.323003
          ],
          [
            -71.582417,
            -16.3224
          ],
          [
            -71.583309,
            -16.321497
          ],
          [
            -71.58099541401359,
            -16.321622630363127
          ],
          [
            -71.58209169547314,
            -16.321242645490916
          ],
          [
            -71.58111693176637,
            -16.321313308759215
          ],
          [
            -71.58113529919434,
            -16.321346006026474
          ],
          [
            -71.58183783190667,
            -16.32074079509229
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-0",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -71.58412303203795,
          -16.327152159045987
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-1",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -71.58269166773941,
          -16.32542251954113
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58322146817011,
          -16.324282041699554
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58659190821639,
          -16.32413025743824
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58533692702055,
          -16.324611943250872
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58361628662423,
          -16.32336347455446
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.5855782911668,
          -16.324473652115838
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-7",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -71.58367709422444,
          -16.328417532811535
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.5862648817536,
          -16.323243876261664
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-9",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -71.58284651112355,
          -16.324910877795404
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-10",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -71.58242698488779,
          -16.32683578271054
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-11",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -71.58132770476413,
          -16.325809535262408
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58249155269256,
          -16.32631493788891
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58316021472302,
          -16.323150170739577
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-14",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -71.58132254072613,
          -16.32466857383187
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-15",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -71.58140462861813,
          -16.32276167099977
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-16",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -71.58232759157178,
          -16.32429841885804
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-17",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -71.58129750293972,
          -16.325135647381558
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58657642593731,
          -16.32861188102029
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-19",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -71.58059799742064,
          -16.32316621991469
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58406197632358,
          -16.327258455923683
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-21",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -71.58685615488696,
          -16.326824663078135
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-vivienda_incremental-22",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -71.58313410466064,
          -16.322694215622125
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58226891237008,
          -16.323990322102464
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58304561049138,
          -16.328727282984143
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58087193666167,
          -16.32810666839499
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58496835931862,
          -16.32912433552866
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 228,
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
          -71.58435083573637,
          -16.32579336756506
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -71.58260762743919,
          -16.32897291307743
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -71.58212781821506,
          -16.32494153704443
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -71.58571248883611,
          -16.326795066080717
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -71.58243037485619,
          -16.325332623025663
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
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
          -71.58706636991056,
          -16.328936276384404
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 113,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-parque_verde-0",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -71.5858054017352,
          -16.327727746275414
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58528514162522,
          -16.32477502168192
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-parque_verde-2",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 3",
        "coordinates": [
          -71.58486976050668,
          -16.326322741013612
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58495035167796,
          -16.329403339815034
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58728673495288,
          -16.328142298041413
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58535745394164,
          -16.32845664294401
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -71.58700518499317,
          -16.328089339640083
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -71.58094163968194,
          -16.326550511647305
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 164,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "arequipa-comunitario-comercio_local-1",
        "scenarioId": "comunitario",
        "type": "comercio_local",
        "name": "Comercio Local 2",
        "coordinates": [
          -71.5822275773956,
          -16.329413452799212
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 164,
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
          -71.58610427680314,
          -16.32599341622035
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 164,
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
          -71.58445920839253,
          -16.32722990501274
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 164,
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
          -71.58577549279703,
          -16.32862901091722
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 164,
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
          -71.58060770013084,
          -16.329183030094953
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
        "id": "arequipa-hibrido-road-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -71.58368092489023,
          -16.32522685705755
        ],
        "pathPoints": [
          [
            -71.581881,
            -16.325227
          ],
          [
            -71.583081,
            -16.325127
          ],
          [
            -71.584281,
            -16.325327
          ],
          [
            -71.585481,
            -16.325227
          ],
          [
            -71.5833714796887,
            -16.326232260748988
          ],
          [
            -71.583663641489,
            -16.32681019173962
          ],
          [
            -71.58363761963835,
            -16.326705748904683
          ],
          [
            -71.5839817092543,
            -16.327144081806573
          ],
          [
            -71.58409079375413,
            -16.32649816165214
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-road-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -71.58335354620914,
          -16.32618482752904
        ],
        "pathPoints": [
          [
            -71.582016,
            -16.32498
          ],
          [
            -71.582908,
            -16.325683
          ],
          [
            -71.583799,
            -16.326686
          ],
          [
            -71.584691,
            -16.327389
          ],
          [
            -71.58274041721607,
            -16.32640193447786
          ],
          [
            -71.58356441845248,
            -16.32754190068084
          ],
          [
            -71.58268839768509,
            -16.32658976300047
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 3000,
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
        "id": "arequipa-hibrido-road-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -71.58314157146067,
          -16.325184946914774
        ],
        "pathPoints": [
          [
            -71.582953,
            -16.323395
          ],
          [
            -71.583079,
            -16.324488
          ],
          [
            -71.583204,
            -16.325882
          ],
          [
            -71.58333,
            -16.326975
          ],
          [
            -71.58328060425391,
            -16.324230357369704
          ],
          [
            -71.58269118701787,
            -16.3238100750191
          ],
          [
            -71.58370382465478,
            -16.323015366850882
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "arequipa-hibrido-road-3",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -71.58417042842878,
          -16.324670439070964
        ],
        "pathPoints": [
          [
            -71.585228,
            -16.323214
          ],
          [
            -71.584523,
            -16.324085
          ],
          [
            -71.583818,
            -16.325256
          ],
          [
            -71.583112,
            -16.326127
          ],
          [
            -71.58494665597256,
            -16.32485895382938
          ],
          [
            -71.58426164264692,
            -16.323746079461632
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-road-4",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 5",
        "coordinates": [
          -71.58072072240172,
          -16.323357725500603
        ],
        "pathPoints": [
          [
            -71.582481,
            -16.322983
          ],
          [
            -71.581308,
            -16.323133
          ],
          [
            -71.580134,
            -16.323582
          ],
          [
            -71.57896,
            -16.323732
          ],
          [
            -71.58013662348915,
            -16.322828313904058
          ],
          [
            -71.57990989798222,
            -16.32208474855706
          ],
          [
            -71.57937189947958,
            -16.32196871010374
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "arequipa-hibrido-road-5",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 6",
        "coordinates": [
          -71.58348703023422,
          -16.32343918609864
        ],
        "pathPoints": [
          [
            -71.585046,
            -16.324339
          ],
          [
            -71.584007,
            -16.323639
          ],
          [
            -71.582967,
            -16.323239
          ],
          [
            -71.581928,
            -16.322539
          ],
          [
            -71.58316333497922,
            -16.324192357408517
          ],
          [
            -71.58391287938277,
            -16.32309472325963
          ],
          [
            -71.58343903080949,
            -16.322125026601643
          ],
          [
            -71.5832196566975,
            -16.321726954002973
          ],
          [
            -71.58269674265352,
            -16.321205354761982
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-0",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -71.5805688252032,
          -16.328866803533224
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-1",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -71.58216932952317,
          -16.324236206610095
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-2",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 3",
        "coordinates": [
          -71.58707932134881,
          -16.32524134895357
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58448488810835,
          -16.324311912083004
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-4",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -71.58192712633819,
          -16.329262265693394
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58310826424011,
          -16.327930610263753
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58555431170977,
          -16.327837498249487
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58074716103101,
          -16.327081534594626
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58111556994662,
          -16.327790847288703
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-9",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -71.58749114661153,
          -16.32263449454222
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58161992687602,
          -16.329296825583278
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-11",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 12",
        "coordinates": [
          -71.58548747971766,
          -16.324700006375256
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58362294221865,
          -16.323576100423054
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.5835053992974,
          -16.32327193370857
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58527232032671,
          -16.327275455993473
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-15",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -71.58209382249301,
          -16.32302653373232
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58291117266138,
          -16.322779661956506
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58579829916576,
          -16.32891289418286
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58184033547508,
          -16.32641465161977
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58336295226214,
          -16.32527689567554
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-20",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 21",
        "coordinates": [
          -71.58582725022511,
          -16.32307110117699
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_incremental-21",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -71.58511496691871,
          -16.327062503013025
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58558017250472,
          -16.32825407703575
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58687299748128,
          -16.324884940176304
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58244343806224,
          -16.322843517142797
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58649420736447,
          -16.32570563560604
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58612408814345,
          -16.32349515767414
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58611886065592,
          -16.32363293601858
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58464871893516,
          -16.32767933619269
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
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
          -71.58731950864578,
          -16.3239200546736
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 243,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-0",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -71.58192917443272,
          -16.327184935197558
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 256,
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
          -71.58349379634953,
          -16.323127246354513
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 256,
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
          -71.58229835165207,
          -16.32934078712378
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 256,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-3",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -71.5853556073188,
          -16.329361443445592
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 256,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-4",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 5",
        "coordinates": [
          -71.5841321654478,
          -16.327423925477536
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 256,
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
          -71.58171321409264,
          -16.32488171557723
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 256,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-vivienda_social-6",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 7",
        "coordinates": [
          -71.58541062893705,
          -16.32334054770145
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 256,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-parque_verde-0",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -71.58232889858229,
          -16.32765685474408
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-parque_verde-1",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -71.58388880942849,
          -16.326434982964344
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58130461890667,
          -16.327394828340758
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58488259624225,
          -16.32725109776234
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-parque_verde-4",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 5",
        "coordinates": [
          -71.58683118685585,
          -16.323289888834363
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -71.58232017768523,
          -16.32330770540951
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-centro_salud-0",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 1",
        "coordinates": [
          -71.5843016197521,
          -16.32587039981134
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
          -71.58065294612331,
          -16.325621377743353
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
        "id": "arequipa-hibrido-escuela-0",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -71.58095020643202,
          -16.323531470842724
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -71.58272552146005,
          -16.327406673789334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
        "ventilationScore": 88,
        "costEstimateUSD": 1800000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-escuela-2",
        "scenarioId": "hibrido",
        "type": "escuela",
        "name": "Escuela 3",
        "coordinates": [
          -71.58697027286065,
          -16.32337130929875
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -71.58198242805248,
          -16.324426751799972
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 19,
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
          -71.58142798285367,
          -16.322571206955054
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 19,
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
          -71.58668420251887,
          -16.323948440698963
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 19,
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
          -71.58672237275077,
          -16.32256293192273
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 19,
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
          -71.584545409687,
          -16.326875337645777
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 19,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "arequipa-hibrido-comercio_local-5",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 6",
        "coordinates": [
          -71.58393489626566,
          -16.32835596518427
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 19,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "arequipa-hibrido-parada_transporte-0",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -71.58218480509974,
          -16.325666994728206
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
        "id": "arequipa-hibrido-parada_transporte-1",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -71.58182784109546,
          -16.32558095866111
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
        "id": "arequipa-hibrido-parada_transporte-2",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 3",
        "coordinates": [
          -71.58439913978236,
          -16.32534081705629
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
    "custom_1": [],
    "custom_2": [],
    "custom_3": []
  },
  "trujillo": {
    "base": [
      {
        "id": "trujillo-base-road-0",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -79.00605997220043,
          -8.078858905777725
        ],
        "pathPoints": [
          [
            -79.006616,
            -8.080571
          ],
          [
            -79.006245,
            -8.07933
          ],
          [
            -79.005875,
            -8.078388
          ],
          [
            -79.005504,
            -8.077147
          ],
          [
            -79.00693654874236,
            -8.079887018994066
          ],
          [
            -79.00648642172024,
            -8.080855753707446
          ],
          [
            -79.00686629052042,
            -8.081580545148348
          ],
          [
            -79.00787603090257,
            -8.08122826501969
          ],
          [
            -79.00878250312144,
            -8.080860349647438
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-road-1",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -79.00908675892927,
          -8.082644284855505
        ],
        "pathPoints": [
          [
            -79.008355,
            -8.084289
          ],
          [
            -79.008843,
            -8.083092
          ],
          [
            -79.009331,
            -8.082196
          ],
          [
            -79.009819,
            -8.081
          ],
          [
            -79.0087995509453,
            -8.083535003170148
          ],
          [
            -79.00798512939394,
            -8.083343684169678
          ],
          [
            -79.00796613424086,
            -8.083971507234134
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "trujillo-base-road-2",
        "scenarioId": "base",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -79.00794084647374,
          -8.080757853877559
        ],
        "pathPoints": [
          [
            -79.006296,
            -8.08149
          ],
          [
            -79.007393,
            -8.080902
          ],
          [
            -79.008489,
            -8.080614
          ],
          [
            -79.009585,
            -8.080026
          ],
          [
            -79.00790790675444,
            -8.080766590514063
          ],
          [
            -79.00703331198784,
            -8.080986570855451
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "existente"
      },
      {
        "id": "trujillo-base-vivienda_incremental-0",
        "scenarioId": "base",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -79.00591652494455,
          -8.07927490745538
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00399352593296,
          -8.081966937833
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00471165926491,
          -8.078597769428772
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.0095196064597,
          -8.082915312805428
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00455490144914,
          -8.084166628323812
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00515466322942,
          -8.08266190641425
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00729618500411,
          -8.083375082716692
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00634927140065,
          -8.080215370040712
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00870880286337,
          -8.080601007206687
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00709816284846,
          -8.082019861896066
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00658350338267,
          -8.078800684671542
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00862986631543,
          -8.083102690306394
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 343,
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
          -79.00575098412192,
          -8.078882616586716
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -79.00626528740025,
          -8.07921825732813
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -79.00589941686496,
          -8.07817993706132
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 112,
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
          -79.00416730146885,
          -8.081489589491316
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 112,
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
          -79.00869294999305,
          -8.08028925200318
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
        "id": "trujillo-municipal-road-0",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -79.00828076832268,
          -8.079964119059413
        ],
        "pathPoints": [
          [
            -79.006569,
            -8.079408
          ],
          [
            -79.00771,
            -8.079679
          ],
          [
            -79.008851,
            -8.08025
          ],
          [
            -79.009993,
            -8.08052
          ],
          [
            -79.00856768151478,
            -8.080851354847404
          ],
          [
            -79.00961740112086,
            -8.079751445684062
          ],
          [
            -79.0100754198577,
            -8.078825586622107
          ],
          [
            -79.01016213833432,
            -8.078563508399892
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-1",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -79.00936807584546,
          -8.078284524648653
        ],
        "pathPoints": [
          [
            -79.008468,
            -8.076726
          ],
          [
            -79.009068,
            -8.077665
          ],
          [
            -79.009668,
            -8.078904
          ],
          [
            -79.010268,
            -8.079843
          ],
          [
            -79.00876297658901,
            -8.078204178888186
          ],
          [
            -79.00866716143688,
            -8.07769588879741
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-2",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -79.0097544469009,
          -8.080465325909179
        ],
        "pathPoints": [
          [
            -79.010129,
            -8.078705
          ],
          [
            -79.009879,
            -8.079778
          ],
          [
            -79.00963,
            -8.081152
          ],
          [
            -79.00938,
            -8.082226
          ],
          [
            -79.01045429062681,
            -8.079649620465426
          ],
          [
            -79.01000389553973,
            -8.080662793278597
          ],
          [
            -79.01054038593037,
            -8.07955463299291
          ],
          [
            -79.01058397232535,
            -8.080458427705425
          ],
          [
            -79.01103742363516,
            -8.081043687421777
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-3",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -79.00346924576147,
          -8.078479598283451
        ],
        "pathPoints": [
          [
            -79.004925,
            -8.077422
          ],
          [
            -79.003955,
            -8.078027
          ],
          [
            -79.002984,
            -8.078932
          ],
          [
            -79.002013,
            -8.079538
          ],
          [
            -79.00270384923776,
            -8.079025952239277
          ],
          [
            -79.00349659191843,
            -8.078614815006018
          ],
          [
            -79.0027435811541,
            -8.079234254455034
          ],
          [
            -79.0018252512682,
            -8.078160589701167
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-road-4",
        "scenarioId": "municipal",
        "type": "pista_vial",
        "name": "Vía / Pista 5",
        "coordinates": [
          -79.00866166111864,
          -8.084332583385875
        ],
        "pathPoints": [
          [
            -79.010452,
            -8.084521
          ],
          [
            -79.009258,
            -8.084295
          ],
          [
            -79.008065,
            -8.08437
          ],
          [
            -79.006872,
            -8.084144
          ],
          [
            -79.00775328874298,
            -8.084487789182287
          ],
          [
            -79.00665572149441,
            -8.084083095554448
          ],
          [
            -79.00748921675067,
            -8.085207777073315
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "trujillo-municipal-vivienda_incremental-0",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -79.00967337442614,
          -8.083247772351882
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-1",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -79.00621894054058,
          -8.0813335581932
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00770451000672,
          -8.082857551050582
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-3",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -79.00547218103912,
          -8.079678906576444
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-4",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 5",
        "coordinates": [
          -79.00571370261471,
          -8.083571563009484
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.01002374678662,
          -8.082376868847371
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-6",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -79.00431147120732,
          -8.07944740420364
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00708174161676,
          -8.078011472272937
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00650254187572,
          -8.084221274272892
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00571291403755,
          -8.077954825274238
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00622746006336,
          -8.08145706935043
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00941461330329,
          -8.084285298605376
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-12",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -79.0098839285632,
          -8.084517382336266
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00901312409518,
          -8.078502009624922
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00704127562818,
          -8.083992137778255
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-15",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -79.00529322878985,
          -8.078995208863583
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00350529383783,
          -8.080264152071878
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-17",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -79.00461732662735,
          -8.078746869615157
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-vivienda_incremental-18",
        "scenarioId": "municipal",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -79.0051270494776,
          -8.078880718185777
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00356338049357,
          -8.084781336719365
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00860332058421,
          -8.083182943709227
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00806498042344,
          -8.083439467538003
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 136,
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
          -79.00994167953887,
          -8.080453008909524
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 194,
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
          -79.00750483833004,
          -8.081542480067284
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 194,
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
          -79.00553876704761,
          -8.083468756697696
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 194,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-vivienda_social-3",
        "scenarioId": "municipal",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -79.00667375335043,
          -8.081121944375427
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 194,
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
          -79.00584251654519,
          -8.08087957675323
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 194,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-municipal-parque_verde-0",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -79.00923105986834,
          -8.080190017602549
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-parque_verde-1",
        "scenarioId": "municipal",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -79.00509663418644,
          -8.078934653470945
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -79.00566656206668,
          -8.077914746838314
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -79.0037295956299,
          -8.082576902944208
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
        "id": "trujillo-municipal-escuela-0",
        "scenarioId": "municipal",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -79.00633681224717,
          -8.084325704275864
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -79.00365044916553,
          -8.08187392425715
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 257,
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
          -79.00667354577539,
          -8.084893415103883
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 257,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-municipal-parada_transporte-0",
        "scenarioId": "municipal",
        "type": "parada_transporte",
        "name": "Parada Transporte 1",
        "coordinates": [
          -79.00917160592817,
          -8.079436244043187
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
          -79.0078710013628,
          -8.084384711578307
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
        "id": "trujillo-comunitario-road-0",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -79.00501061765877,
          -8.07840377547823
        ],
        "pathPoints": [
          [
            -79.006215,
            -8.079741
          ],
          [
            -79.005412,
            -8.07875
          ],
          [
            -79.004609,
            -8.078058
          ],
          [
            -79.003806,
            -8.077066
          ],
          [
            -79.00434487582379,
            -8.079352075518567
          ],
          [
            -79.00501044014847,
            -8.078912082535517
          ],
          [
            -79.00576374074771,
            -8.078969997219568
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "trujillo-comunitario-road-1",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -79.00338361753532,
          -8.080445125159894
        ],
        "pathPoints": [
          [
            -79.003384,
            -8.082245
          ],
          [
            -79.003384,
            -8.080945
          ],
          [
            -79.003384,
            -8.079945
          ],
          [
            -79.003384,
            -8.078645
          ],
          [
            -79.00249738100273,
            -8.081557727099
          ],
          [
            -79.0018759387284,
            -8.081397743376797
          ],
          [
            -79.00175285041114,
            -8.081545393208708
          ],
          [
            -79.00250623191523,
            -8.080945579604704
          ],
          [
            -79.003017724021,
            -8.08191416831313
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-road-2",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -79.00877787137446,
          -8.079989595061578
        ],
        "pathPoints": [
          [
            -79.007573,
            -8.081327
          ],
          [
            -79.008376,
            -8.080335
          ],
          [
            -79.009179,
            -8.079644
          ],
          [
            -79.009982,
            -8.078652
          ],
          [
            -79.00895395315926,
            -8.079485632906652
          ],
          [
            -79.00869034808346,
            -8.07856964069897
          ],
          [
            -79.00878013956408,
            -8.078344689499286
          ],
          [
            -79.00958850675613,
            -8.078640736863528
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 4000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 400000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-road-3",
        "scenarioId": "comunitario",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -79.00870799358366,
          -8.080660735678014
        ],
        "pathPoints": [
          [
            -79.006918,
            -8.080849
          ],
          [
            -79.008111,
            -8.080623
          ],
          [
            -79.009305,
            -8.080698
          ],
          [
            -79.010498,
            -8.080473
          ],
          [
            -79.00834062115125,
            -8.081355440734605
          ],
          [
            -79.00936839985357,
            -8.082393096271305
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-0",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -79.00448178884524,
          -8.078301337280386
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-1",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 2",
        "coordinates": [
          -79.00480290459724,
          -8.081335912951058
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00899133951891,
          -8.080101962953417
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-3",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 4",
        "coordinates": [
          -79.00931704557135,
          -8.078639884322989
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.0091274134398,
          -8.083882279505172
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.01005530830678,
          -8.083753862400977
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-6",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 7",
        "coordinates": [
          -79.00507095544815,
          -8.079469056690872
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00729670417955,
          -8.07926744587559
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00723008859732,
          -8.080543504426464
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00726957738077,
          -8.081264012856085
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.01010617373447,
          -8.083280769290552
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00987681214963,
          -8.084254485722408
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.0071762441684,
          -8.082964927173682
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-13",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -79.0068206125434,
          -8.083945431170308
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.0082148536381,
          -8.079764836012185
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-15",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 16",
        "coordinates": [
          -79.00445229994828,
          -8.084871214386302
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00715393513448,
          -8.078381806569832
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-17",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 18",
        "coordinates": [
          -79.00912868486886,
          -8.08297817424753
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00583452196727,
          -8.082362103551946
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00487928473675,
          -8.084336334555179
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00865244952521,
          -8.084517383319158
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00437511578077,
          -8.082622306110752
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00902685336841,
          -8.08051092011236
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00617427337887,
          -8.081901125182387
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-24",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 25",
        "coordinates": [
          -79.00754001009213,
          -8.081907994604041
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_incremental-25",
        "scenarioId": "comunitario",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -79.0093193489522,
          -8.083703575676118
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
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
          -79.00934788480743,
          -8.082752657905752
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 108,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-0",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 1",
        "coordinates": [
          -79.00897854294048,
          -8.081708175573752
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 220,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-1",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 2",
        "coordinates": [
          -79.00970149199672,
          -8.084870980727041
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 220,
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
          -79.00492005815488,
          -8.079634369219521
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 220,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-vivienda_social-3",
        "scenarioId": "comunitario",
        "type": "vivienda_social",
        "name": "Vivienda Social 4",
        "coordinates": [
          -79.0092285010547,
          -8.084419181971054
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 220,
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
          -79.00649923799784,
          -8.084715207745015
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 220,
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
          -79.00800510697496,
          -8.07845020267004
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 220,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-parque_verde-0",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -79.00405909498316,
          -8.081490480241763
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-comunitario-parque_verde-1",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -79.00779690066875,
          -8.079925662717146
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -79.00808526099293,
          -8.080702435353066
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-parque_verde-3",
        "scenarioId": "comunitario",
        "type": "parque_verde",
        "name": "Parque Verde 4",
        "coordinates": [
          -79.00622935342483,
          -8.081474183259923
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -79.0068926660082,
          -8.084748923548286
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-comunitario-escuela-0",
        "scenarioId": "comunitario",
        "type": "escuela",
        "name": "Escuela 1",
        "coordinates": [
          -79.00856280641513,
          -8.080387780140017
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -79.00514650452052,
          -8.081029134086867
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -79.0078299904887,
          -8.082875293747467
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 135,
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
          -79.00857754918692,
          -8.08358387866474
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 135,
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
          -79.00442426114039,
          -8.082513383977071
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 135,
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
          -79.00349057665193,
          -8.082197902004607
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 135,
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
          -79.0057103787991,
          -8.079944138077183
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 135,
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
          -79.01018390564487,
          -8.084495055031278
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
        "id": "trujillo-hibrido-road-0",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 1",
        "coordinates": [
          -79.00464439631213,
          -8.079808586840226
        ],
        "pathPoints": [
          [
            -79.003188,
            -8.078751
          ],
          [
            -79.004159,
            -8.079356
          ],
          [
            -79.00513,
            -8.080261
          ],
          [
            -79.006101,
            -8.080867
          ],
          [
            -79.00382010810713,
            -8.079255663596173
          ],
          [
            -79.00464188835825,
            -8.079954148746028
          ],
          [
            -79.00412245371663,
            -8.080432787662302
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 3000,
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
        "id": "trujillo-hibrido-road-1",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 2",
        "coordinates": [
          -79.00521710982262,
          -8.083119834798392
        ],
        "pathPoints": [
          [
            -79.004843,
            -8.081359
          ],
          [
            -79.005092,
            -8.082433
          ],
          [
            -79.005342,
            -8.083807
          ],
          [
            -79.005591,
            -8.084881
          ],
          [
            -79.0058453575927,
            -8.083717393761741
          ],
          [
            -79.00584175422817,
            -8.084143786216092
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-2",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 3",
        "coordinates": [
          -79.00706651143756,
          -8.083186576742744
        ],
        "pathPoints": [
          [
            -79.007967,
            -8.081628
          ],
          [
            -79.007367,
            -8.082567
          ],
          [
            -79.006767,
            -8.083806
          ],
          [
            -79.006167,
            -8.084745
          ],
          [
            -79.00639933583595,
            -8.083817074918882
          ],
          [
            -79.00751035287533,
            -8.083905459853328
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-3",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 4",
        "coordinates": [
          -79.00722650911946,
          -8.082219968494332
        ],
        "pathPoints": [
          [
            -79.008938,
            -8.081664
          ],
          [
            -79.007797,
            -8.081935
          ],
          [
            -79.006656,
            -8.082505
          ],
          [
            -79.005515,
            -8.082776
          ],
          [
            -79.00621244003726,
            -8.081721008080478
          ],
          [
            -79.00727909431133,
            -8.082096812766528
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-4",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 5",
        "coordinates": [
          -79.00610402012458,
          -8.08378688014003
        ],
        "pathPoints": [
          [
            -79.007748,
            -8.084519
          ],
          [
            -79.006652,
            -8.083931
          ],
          [
            -79.005556,
            -8.083643
          ],
          [
            -79.00446,
            -8.083055
          ],
          [
            -79.00548645698854,
            -8.084728218410836
          ],
          [
            -79.00513881121195,
            -8.085231340472918
          ],
          [
            -79.00525495383016,
            -8.085840827323716
          ],
          [
            -79.00483831548642,
            -8.08555529924281
          ],
          [
            -79.0047104260056,
            -8.084519090090623
          ]
        ],
        "roadWidth": 12,
        "footprintArea": 5000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 500000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-road-5",
        "scenarioId": "hibrido",
        "type": "pista_vial",
        "name": "Vía / Pista 6",
        "coordinates": [
          -79.00852969349393,
          -8.08362817673556
        ],
        "pathPoints": [
          [
            -79.009262,
            -8.085273
          ],
          [
            -79.008774,
            -8.084076
          ],
          [
            -79.008286,
            -8.08318
          ],
          [
            -79.007798,
            -8.081984
          ],
          [
            -79.00763381270494,
            -8.083381479300755
          ],
          [
            -79.0071633199627,
            -8.082729355192464
          ]
        ],
        "roadWidth": 8,
        "footprintArea": 2000,
        "floors": 1,
        "heightMeters": 0.15,
        "unitsCount": 0,
        "populationCapacity": 2000,
        "solarOrientation": 0,
        "ventilationScore": 90,
        "costEstimateUSD": 200000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-0",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 1",
        "coordinates": [
          -79.00339563512124,
          -8.07902112032826
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00987959216612,
          -8.078737967276004
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.0036892939257,
          -8.08323631869262
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00529206664605,
          -8.080754019488015
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00974357044298,
          -8.079572208881931
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-5",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 6",
        "coordinates": [
          -79.00425027817754,
          -8.084276065993281
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00450380052938,
          -8.078499223044446
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-7",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 8",
        "coordinates": [
          -79.00651983776591,
          -8.079321475621466
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00515948978514,
          -8.08251284596738
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-9",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 10",
        "coordinates": [
          -79.00577247808063,
          -8.081524448588612
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-10",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 11",
        "coordinates": [
          -79.00731119913036,
          -8.080794951857813
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.006108011754,
          -8.083624108804216
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-12",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 13",
        "coordinates": [
          -79.00432613096415,
          -8.081027278322821
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-13",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 14",
        "coordinates": [
          -79.01002068986887,
          -8.080688918508347
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-14",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 15",
        "coordinates": [
          -79.00805792722704,
          -8.081943023560848
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00578359586014,
          -8.084718991402605
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-16",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 17",
        "coordinates": [
          -79.00656354554047,
          -8.083945510799168
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00680404700304,
          -8.082446310383105
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-18",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 19",
        "coordinates": [
          -79.00756932214796,
          -8.07930449902139
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-19",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 20",
        "coordinates": [
          -79.00336382413775,
          -8.078803126513266
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.0051676460114,
          -8.079576969174092
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-21",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 22",
        "coordinates": [
          -79.00840188459419,
          -8.080181317968526
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-22",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 23",
        "coordinates": [
          -79.00364500177005,
          -8.081678357042222
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00377377086254,
          -8.078350614126128
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-24",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 25",
        "coordinates": [
          -79.00714450845386,
          -8.08290769293508
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-25",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 26",
        "coordinates": [
          -79.00835440644744,
          -8.084147088382627
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-26",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 27",
        "coordinates": [
          -79.00826992225029,
          -8.08229014701758
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00526206168729,
          -8.082205225232707
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
        "ventilationScore": 65,
        "costEstimateUSD": 15000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_incremental-28",
        "scenarioId": "hibrido",
        "type": "vivienda_incremental",
        "name": "Vivienda Incremental 29",
        "coordinates": [
          -79.00468946231909,
          -8.08426313127665
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.0076562246804,
          -8.081050944712056
        ],
        "footprintArea": 400,
        "floors": 2,
        "heightMeters": 6,
        "unitsCount": 1,
        "populationCapacity": 5,
        "solarOrientation": 17,
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
          -79.00981390434163,
          -8.079079588290115
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 171,
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
          -79.00770221074664,
          -8.084159348400036
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 171,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-2",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 3",
        "coordinates": [
          -79.0088845614597,
          -8.08375312416298
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 171,
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
          -79.00660891511848,
          -8.083976467588075
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 171,
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
          -79.00652502612128,
          -8.078636639949444
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 171,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-5",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 6",
        "coordinates": [
          -79.00884580905776,
          -8.08489766814956
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 171,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-vivienda_social-6",
        "scenarioId": "hibrido",
        "type": "vivienda_social",
        "name": "Vivienda Social 7",
        "coordinates": [
          -79.00946264629816,
          -8.08393118060805
        ],
        "footprintArea": 1200,
        "floors": 5,
        "heightMeters": 15,
        "unitsCount": 20,
        "populationCapacity": 80,
        "solarOrientation": 171,
        "ventilationScore": 85,
        "costEstimateUSD": 800000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-parque_verde-0",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 1",
        "coordinates": [
          -79.00812799325297,
          -8.082758440524358
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-parque_verde-1",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 2",
        "coordinates": [
          -79.00339503082812,
          -8.079468848382168
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -79.00855362739955,
          -8.079268733719863
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -79.00892113511983,
          -8.083138749456552
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-parque_verde-4",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 5",
        "coordinates": [
          -79.007129250203,
          -8.08145180304086
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
        "ventilationScore": 100,
        "costEstimateUSD": 45000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-parque_verde-5",
        "scenarioId": "hibrido",
        "type": "parque_verde",
        "name": "Parque Verde 6",
        "coordinates": [
          -79.00527075015361,
          -8.08042735523268
        ],
        "footprintArea": 3500,
        "floors": 1,
        "heightMeters": 0,
        "unitsCount": 0,
        "populationCapacity": 800,
        "solarOrientation": 180,
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
          -79.00890978119452,
          -8.079927235137337
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
        "id": "trujillo-hibrido-centro_salud-1",
        "scenarioId": "hibrido",
        "type": "centro_salud",
        "name": "Centro Salud 2",
        "coordinates": [
          -79.009832777353,
          -8.082109951899474
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
          -79.00410436224062,
          -8.079189443794334
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -79.00735102082683,
          -8.08483552833338
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -79.0060895729662,
          -8.078110036726512
        ],
        "footprintArea": 2500,
        "floors": 3,
        "heightMeters": 11,
        "unitsCount": 0,
        "populationCapacity": 600,
        "solarOrientation": 180,
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
          -79.00849458782218,
          -8.078906751360838
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 114,
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
          -79.009048103635,
          -8.081476034047531
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 114,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-comercio_local-2",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 3",
        "coordinates": [
          -79.01018389084973,
          -8.080138695399885
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 114,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "propuesto"
      },
      {
        "id": "trujillo-hibrido-comercio_local-3",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 4",
        "coordinates": [
          -79.00462439059406,
          -8.078295838509602
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 114,
        "ventilationScore": 70,
        "costEstimateUSD": 150000,
        "status": "existente"
      },
      {
        "id": "trujillo-hibrido-comercio_local-4",
        "scenarioId": "hibrido",
        "type": "comercio_local",
        "name": "Comercio Local 5",
        "coordinates": [
          -79.00669964515394,
          -8.08441149989745
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 114,
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
          -79.0101261949742,
          -8.081437697571275
        ],
        "footprintArea": 500,
        "floors": 2,
        "heightMeters": 7,
        "unitsCount": 0,
        "populationCapacity": 150,
        "solarOrientation": 114,
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
          -79.00899926872208,
          -8.084033080286133
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
        "id": "trujillo-hibrido-parada_transporte-1",
        "scenarioId": "hibrido",
        "type": "parada_transporte",
        "name": "Parada Transporte 2",
        "coordinates": [
          -79.00807760458136,
          -8.0808961473188
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
          -79.00969457522193,
          -8.078287133304322
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
    "custom_1": [],
    "custom_2": [],
    "custom_3": []
  }
};

export const INITIAL_FORUM_THREADS: ForumThread[] = [
  {
    id: 'th-1',
    author: 'Junta Vecinal Lomas',
    role: 'residente',
    title: 'Ubicación del nuevo Parque y Huerto Urbano',
    content: 'Proponemos ubicar el gran parque en la zona norte donde el suelo es más estable. Además, ayuda a contener los deslizamientos y mejora la temperatura local.',
    timestamp: 'Hace 2 horas',
    upvotes: 42,
    comments: [],
    coordinates: [-77.01, -12.01],
    category: 'espacio_publico',
    sentiment: 'propuesta',
    downvotes: 0
  },
  {
    id: 'th-2',
    author: 'Urbanista Muni',
    role: 'administrador',
    title: 'Viabilidad de Vías Principales',
    content: 'Técnicamente necesitamos concentrar la inversión vial en el eje troncal para garantizar acceso al transporte masivo.',
    timestamp: 'Hace 5 horas',
    upvotes: 28,
    comments: [],
    coordinates: [-77.01, -12.01],
    category: 'espacio_publico',
    sentiment: 'propuesta',
    downvotes: 0
  },
  {
    id: 'th-3',
    author: 'Colectivo Ambiental',
    role: 'facilitador',
    title: 'Materialidad y Confort Térmico',
    content: 'Es clave usar arquitectura vernácula (sillar / tierra compactada) en lugar de tanto concreto para evitar la isla de calor.',
    timestamp: 'Ayer',
    upvotes: 35,
    comments: [],
    coordinates: [-77.01, -12.01],
    category: 'espacio_publico',
    sentiment: 'propuesta',
    downvotes: 0
  }
];

export const INITIAL_BUDGET_ALLOCATION: BudgetVoteAllocation = {
  vivienda: 25,
  areas_verdes: 20,
  salud_cuidados: 15,
  educacion_cultura: 15,
  movilidad: 15,
  empleo_comercio: 10
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
  { id: 'c1', name: 'Presupuesto Inicial ($)', weight: 0.15 },
  { id: 'c2', name: 'Densidad Habitacional', weight: 0.25 },
  { id: 'c3', name: 'Área Verde Pública', weight: 0.30 },
  { id: 'c4', name: 'Accesibilidad (15 min)', weight: 0.20 },
  { id: 'c5', name: 'Confort Bioclimático', weight: 0.10 }
];

export const INITIAL_AHP_MATRIX = [
  [1, 0.5, 0.33, 0.5, 2],
  [2, 1, 0.5, 2, 3],
  [3, 2, 1, 2, 4],
  [2, 0.5, 0.5, 1, 3],
  [0.5, 0.33, 0.25, 0.33, 1]
];
