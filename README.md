# HeatShield Khujand

HeatShield Khujand is a public heat-risk dashboard prototype that started with Khujand, Tajikistan and now supports multiple cities. It combines a non-official live forecast, city heat-threshold context, a dynamic hotspot map, multilingual public guidance, and a transparent scientific risk model.

Live site:

https://zafarhamidov.github.io/heatshield-khujand/

## What It Shows

- City selector for Khujand, Dushanbe, Tashkent, Central Asia peers, and high-data global benchmark cities.
- Non-official Open-Meteo forecast for the selected city.
- IFRC/Tajikistan EAP heatwave trigger context for Khujand/Sughd.
- Hourly hotspot dynamics with a date/time slider.
- OSM-derived 650 m scientific risk grid for Khujand and lower-confidence screening grids for other cities.
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
