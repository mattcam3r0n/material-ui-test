
CurrentUsageComponent -> EGaugeService: getCurrentUsage()
EGaugeService -> CurrentUsageController: GET current
CurrentUsageController -> Egauge: inst
Egauge -> CurrentUsageController: xml
EGaugeService -> CurrentUsageComponent: usageData

Client
* EGaugeService
  * talks to server to fetch usage data
  * used by components to get data and update state

Server
* routes
  * GET current -- current usage
  * GET history -- historical usage
* CurrentController
* HistoryController
* Egauge.js
  * utility for calling egauge API and transforming result from xml to json
  * no app specific logic. just get it into a more digestable form