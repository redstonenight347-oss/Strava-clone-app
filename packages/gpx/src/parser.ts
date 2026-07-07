import { XMLParser } from "fast-xml-parser"

export type RawTrackpoint = {
  lat: number,
  lng: number,
  ele: number | null,
  time: Date | null,
}

export function parserGPX(xmlString: string): RawTrackpoint[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name: string) => ["trkpt", "trk", "trkseg"].includes(name),
  })

  const result = parser.parse(xmlString)

  // Example is below the function

  const tracks = result?.gpx?.trk ?? []
  const trackPoints: RawTrackpoint[] = []

  for (const trk of tracks) {
    const segments = trk?.trkseg ?? []
    for (const seg of segments) {
      const points = seg?.trkpt ?? []
      for (const pt of points) {
        trackPoints.push({
          lat: parseFloat(pt["@_lat"]),
          lng: parseFloat(pt["@_lon"]),
          ele: pt.ele ? parseFloat(pt.ele) : null,
          time: pt.time ? new Date(pt.time) : null,
        })
      }
    }
  }

  return trackPoints
}

// TL;DR: gpx:{trk:[ {trkseg:[ {trkpt: [ {data here} ]} ]} ]}

/** Example structure of parsed GPX object:
 * {
  "?xml": {
    "@_version": "1.0",
    "@_encoding": "UTF-8"
  },
  "gpx": {
    "metadata": {
      "name": "Shiroor Local Walk",
      "desc": "A simple sample route in Shiroor, Karnataka"
    },
    "trk": [
      {
        "name": "Walking Track",
        "trkseg": [
          {
            "trkpt": [
              {
                "ele": 12,
                "time": "2026-07-07T12:00:00Z",
                "@_lat": "13.9118",
                "@_lon": "74.6593"
              },
              {
                "ele": 15,
                "time": "2026-07-07T12:05:00Z",
                "@_lat": "13.9125",
                "@_lon": "74.6601"
              },
              {
                "ele": 18,
                "time": "2026-07-07T12:10:00Z",
                "@_lat": "13.9132",
                "@_lon": "74.6598"
              },
              {
                "ele": 14,
                "time": "2026-07-07T12:15:00Z",
                "@_lat": "13.9139",
                "@_lon": "74.6609"
              }
            ]
          }
        ]
      }
    ],
    "@_version": "1.1",
    "@_creator": "GPX Simple Creator",
    "@_xmlns": "http://topografix.com"
  }
}
 */