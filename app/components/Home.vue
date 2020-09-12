<template>
  <Page class="page">
    <ActionBar class="action-bar" title="DiscoverOhrid Sample"></ActionBar>
    <GridLayout>
      <ContentView height="100%" width="100%">
        <Mapbox
          delay="2000"
          accessToken="pk.eyJ1IjoiZHVrbGVza2luIiwiYSI6ImNrZXdoMmVpeTA2dTQydW1wd20waWIweGYifQ.mqTNtLvRWg-mZPeHNkVb7w"
          mapStyle="streets"
          :latitude="!user.location.lat ? '41.1111027' : user.location.lat"
          :longitude="!user.location.lng ? '20.7887527' : user.location.lng"
          hideCompass="true"
          zoomLevel="15"
          disableZoom="false"
          disableRotation="false"
          disableScroll="false"
          disableTilt="false"
          @mapReady="onMapReady($event)"
        ></Mapbox>
      </ContentView>
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "utils/utils";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get

export default {
  data() {
    return {
      map: null,
      user: {
        location: {
          lat: "",
          lng: "",
        },
      },
    };
  },
  methods: {
    onMapReady(args) {
      this.map = args.map;
      this.setGeolocation();
      this.setMarkers();
      this.drawPolyfill();
    },
    setGeolocation() {
      geolocation.enableLocationRequest().then(() => {
        geolocation
          .getCurrentLocation({ desiredAccuracy: Accuracy.high })
          .then((userLocation) => {
            this.user.location.lat = userLocation.latitude;
            this.user.location.lng = userLocation.longitude;

            setTimeout(() => {
              this.map.addMarkers([
                {
                  lat: this.user.location.lat,
                  lng: this.user.location.lng,
                  title: "My Location",
                  selected: true, 
                  onCalloutTap: function () {
                    console.log("'Nice location' marker callout tapped");
                  },
                },
              ]);

              this.map.setCenter({
                lat: this.user.location.lat,
                lng: this.user.location.lng,
                animated: true,
              });
            }, 1000);
          });
      });
    },
    setMarkers() {
      setTimeout(() => {
        this.map.addMarkers([
          {
            lat: 41.1111027,
            lng: 20.7887527,
            title: "St. John Kaneo",
            subtitle: "Really really nice location",
            selected: false,
            onCalloutTap: function () {
              console.log("'Nice location' marker callout tapped");
            },
          },
          {
            lat: 41.11231,
            lng: 20.790464,
            title: "St. Cleament",
            subtitle: "Really really nice location",
            selected: false,
            onCalloutTap: function () {
              console.log("'Nice location' marker callout tapped");
            },
          },
          {
            lat: 41.1137712,
            lng: 20.7883309,
            title: "Labino",
            subtitle: "Hidden gemms",
            selected: false,
            onCalloutTap: function () {
              console.log("'Nice location' marker callout tapped");
            },
          },
        ]);
      }, 1200);
    },
    drawPolyfill() {
      setTimeout(() => {
        this.map.addPolyline({
          id: 1, // optional, can be used in 'removePolylines'
          color: "#336699", // Set the color of the line (default black)
          width: 7, // Set the width of the line (default 5)
          opacity: 0.6, //Transparency / alpha, ranging 0-1. Default fully opaque (1).
          points: [
            {
              lat: 41.1111027, // mandatory
              lng: 20.7887527, // mandatory
            },
            {
              lat: 41.111073,
              lng: 20.788752,
            },
            {
              lat: 41.111073,
              lng: 20.788803,
            },
            {
              lat: 41.111259,
              lng: 20.788939,
            },
            {
              lat: 41.111305,
              lng: 20.789518,
            },
            {
              lat: 41.111279,
              lng: 20.789869,
            },
            {
              lat: 41.111591,
              lng: 20.790422,
            },
            {
              lat: 41.111591,
              lng: 20.790714,
            },
            {
              lat: 41.11231,
              lng: 20.790464,
            },
          ],
        });
      }, 1500);
    }
  },
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
