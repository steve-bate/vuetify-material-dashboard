<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-temperature-fahrenheit"
          title="Temperature"
          :value="weather.main.temp + '°'"
          sub-icon="mdi-clock"
          :sub-text="updatedWhen(new Date(weather.dt * 1000))"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-water"
          title="Humidity"
          :value="weather.main.humidity + '%'"
          sub-icon="mdi-clock"
          :sub-text="updatedWhen(new Date(weather.dt * 1000))"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-airballoon"
          title="Barometric Pressure"
          :value="String(weather.main.pressure)"
          small-value="mb"
          sub-icon="mdi-clock"
          :sub-text="updatedWhen(new Date(weather.dt * 1000))"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-weather-windy"
          title="Wind Speed"
          :value="String(weather.wind.speed)"
          small-value="mph"
          sub-icon="mdi-clock"
          :sub-text="updatedWhen(new Date(weather.dt * 1000))"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-chart-line"
          title="SP500"
          :value="String(equityQuote('^SPX').regularMarketPreviousClose)"
          sub-icon="mdi-clock"
          :sub-text="updatedWhen(new Date())"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="#0000ff"
          icon="mdi-chart-histogram"
          title="Dow"
          :value="String(equityQuote('^DJI').regularMarketPreviousClose)"
          sub-icon="mdi-clock"
          :sub-text="updatedWhen(new Date())"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-currency-eur"
          title="EUR/USD"
          :value="'$' + toFixed(parseFloat(forexQuote('EUR-USD').data['5. Exchange Rate']), 4)"
          small-value=""
          sub-icon="mdi-clock"
          :sub-text="'Updated at ' + forexQuote('EUR-USD').data['6. Last Refreshed'] + ' UTC'"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-currency-btc"
          title="Bitcoin"
          :value="'$' + toFixed(parseFloat(forexQuote('BTC-USD').data['5. Exchange Rate']), 0)"
          small-value=""
          sub-icon="mdi-clock"
          :sub-text="'Updated at ' + forexQuote('BTC-USD').data['6. Last Refreshed'] + ' UTC'"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template #reveal-actions>
            <v-tooltip bottom>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Website Views
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Campaign Performance
          </p>

          <template #actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="text-caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template #reveal-actions>
            <v-tooltip bottom>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Daily Sales
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            increase in today's sales
          </p>

          <template #actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="text-caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template #reveal-actions>
            <v-tooltip bottom>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Completed Tasks
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Last Campaign Performance
          </p>

          <template #actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="text-caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template #heading>
            <div class="text-h3 font-weight-light">
              Trending Topics
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Bing Cognitive Search
            </div>
          </template>
          <v-card-text>
            <v-data-table
              hide-default-header
              :headers="headers"
              :items="newsItems"
            >
              <template #item.image="{ item }">
                <img
                  class="news-image"
                  :src="item.image.url"
                >
              </template>
              <template #item.name="{ item }">
                <a :href="item.newsSearchUrl">{{ item.name }}</a><br>{{ item.query.text }}
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card class="px-5 py-3">
          <template #heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
              >Tasks:</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-bug
                </v-icon>
                Bugs
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-code-tags
                </v-icon>
                Website
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">
                  mdi-cloud
                </v-icon>
                Server
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items
            v-model="tabs"
            class="transparent"
          >
            <v-tab-item
              v-for="n in 3"
              :key="n"
            >
              <v-card-text>
                <template v-for="(task, i) in tasks[tabs]">
                  <v-row
                    :key="i"
                    align="center"
                  >
                    <v-col cols="1">
                      <v-list-item-action>
                        <v-checkbox
                          v-model="task.value"
                          color="secondary"
                        />
                      </v-list-item-action>
                    </v-col>

                    <v-col cols="9">
                      <div
                        class="font-weight-light"
                        v-text="task.text"
                      />
                    </v-col>

                    <v-col
                      cols="2"
                      class="text-right"
                    >
                      <v-icon class="mx-1">
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        color="error"
                        class="mx-1"
                      >
                        mdi-close
                      </v-icon>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import weatherApi from '../../api/WeatherApi'
  import marketDataApi from '../../api/MarketDataApi'
  import newsApi from '../../api/NewsApi'

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        // TODO Connect to weather API
        weather: {
          coord: {
          },
          weather: [],
          base: 'stations',
          main: {
          },
          visibility: 10000,
          wind: {
          },
          clouds: {
          },
          dt: 1615144181,
          sys: {
          },
          timezone: -18000,
          id: 0,
          name: 'Bala Cynwyd',
          cod: 200,
        },
        equityQuotes: {
        },
        forexQuotes: {
          'EUR-USD': { data: {} },
          'BTC-USD': { data: {} },
        },
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        headers: [
          {
            sortable: false,
            text: 'Image',
            value: 'image',
          },
          {
            sortable: true,
            text: 'Name',
            value: 'name',
          },
        ],
        newsItems: [
        ],
        tabs: 0,
        tasks: {
          0: [
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: false,
            },
            {
              text: 'Create 4 Invisible User Experiences you Never Knew About',
              value: true,
            },
          ],
          1: [
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: false,
            },
          ],
          2: [
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
          ],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    computed: {
    },

    async mounted () {
      // TODO run API queries concurrently
      this.weather = await weatherApi.getWeatherData()
      this.equityQuotes = await marketDataApi.getStockQuotes(['^DJI', '^SPX'])
      this.forexQuotes['EUR-USD'] = await marketDataApi.getForexQuote('EUR', 'USD')
      this.forexQuotes['BTC-USD'] = await marketDataApi.getForexQuote('BTC', 'USD')
      this.newsItems = await newsApi.getTrendingTopics()
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },

      updatedWhen (when) {
        return 'Updated at ' + moment(when).format('YYYY-MM-DD hh:mm:ss A')
      },

      equityQuote (symbol) {
        return this.equityQuotes[symbol] || {}
      },

      forexQuote (pair) {
        return this.forexQuotes[pair] || {}
      },

      toFixed (value, precision) {
        return value ? value.toFixed(precision) : value
      },
    },
  }
</script>

<style scoped>
.news-image {
  width: 48px;
}
</style>
