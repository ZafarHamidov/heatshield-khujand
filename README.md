# HeatShield Khujand

HeatShield Khujand is a public heat-risk dashboard prototype for Khujand, Tajikistan. It combines a non-official live forecast, IFRC/Tajikistan EAP trigger context, a dynamic hotspot map, multilingual public guidance, and a transparent scientific risk model.

Live site:

https://zafarhamidov.github.io/heatshield-khujand/

## What It Shows

- Non-official Open-Meteo forecast for Khujand.
- IFRC/Tajikistan EAP heatwave trigger context for Khujand/Sughd.
- Hourly hotspot dynamics with a date/time slider.
- OSM-derived 650 m scientific risk grid.
- Heat action guidance in English, Russian, and Tajik.
- Source audit and data limitations.

## Scientific Status

The current model is a transparent scientific prototype. It uses live weather plus OpenStreetMap-derived proxies for buildings, facilities, exposure, and cooling gaps. It is not an official warning system and should not replace Tajik Hydromet or local authority alerts.

Future validation should add Landsat land surface temperature, Sentinel-2 vegetation/shade indices, WorldPop population, Tajik Hydromet station data, and local field sensors.

## Local Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```
