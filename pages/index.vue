<template>
  <div id="game" v-if="generated">
    <div id="menuBar">
      <div id="menuLine">
        <v-btn :disabled="started" color="error" @click="createNewSolider(solders.length+1,`solider-${solders.length+1}`,0)">
          <v-icon>mdi-plus-box</v-icon>
        </v-btn>
        <v-btn :disabled="started" color="primary" @click="createNewSolider(solders.length+1,`solider-${solders.length+1}`,1)">
          <v-icon>mdi-plus-box</v-icon>
        </v-btn>
        <v-btn :disabled="started" @click="initGame">
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn :disabled="!started" @click="stopGame">
          <v-icon>mdi-pause</v-icon>
        </v-btn>
        <v-select label="Speed" v-model="speedOfRound" :items="[200,500,1000]" />
        <v-btn :disabled="started" @click="editingMap = !editingMap">Edit map</v-btn>
        <v-btn :disabled="!editingMap" @click="stepSelectedTileOption" :color="tileOptions[selectedTileOption].color">{{tileOptions[selectedTileOption].text}}</v-btn>
      </div>
      <div id="stands">
        <div class="my-2">
          <v-card v-for="(solider, index) in aliveSolders.filter(sol => sol.teamId === 0).sort((a,b) => {
            if (a.agility > b.agility) return -1;
            if (a.agility < b.agility) return 1;
            return 0;
          })" :key="index" width="200" style="padding: 10px;color: white"
                  :color="solider.teamId === 0 ? '#f00' : '#00f'"
          >
            <v-card class="pa-2">
              <div style="display: flex;flex-direction: row;">
                <div><span class="font-weight-bold">Name: </span> {{ solider.name }}</div>
              </div>
              <div style="display: flex;flex-direction: row;">
                <v-text-field label="Életpont" type="number" v-model="solider.health"/>
                <v-text-field label="Agility" type="number" v-model="solider.agility"/>
              </div>
              <div style="display: flex;flex-direction: row;">
                <v-text-field label="Attack power" type="number" v-model="solider.power"/>
                <v-text-field label="Defense" type="number" v-model="solider.defense"/>
              </div>
              <div style="display: flex;flex-direction: row;">
                <v-text-field label="Y" type="number" v-model="solider.y"/>
                <v-text-field label="X" type="number" v-model="solider.x"/>
              </div>
              <div style="display: flex;flex-direction: row;">
                <svg v-if="solider.class === 'SWORDMAN'" fill="#000000" height="32px" width="32px"
                     viewBox="0 0 300.226 300.226" xml:space="preserve">
<g>
	<path d="M63.951,243.575c-1.945-3.578-4.401-6.907-7.363-9.869c-3.106-3.102-6.626-5.633-10.4-7.63
		c-4.51-2.387-0.945-7.5-0.945-7.5c4.616-7.023,8.825-14.079,12.305-20.226l-23.363-23.344H11.504c-4.362,0-7.898-3.539-7.898-7.902
		c0-4.361,3.536-7.9,7.898-7.9h25.947c2.1,0,4.107,0.832,5.588,2.312l85.379,85.291c1.483,1.483,2.315,3.495,2.315,5.589v26.073
		c0,4.365-3.537,7.897-7.9,7.897c-4.367,0-7.904-3.531-7.904-7.897v-22.798l-23.27-23.24c-6.281,3.707-13.582,8.252-20.816,13.25
		C70.842,245.679,66.698,248.629,63.951,243.575z"/>
  <path d="M26.61,237.102c-7.106,0-13.784,2.764-18.812,7.784c-5.019,5.015-7.782,11.686-7.782,18.778
		c0,7.097,2.764,13.762,7.782,18.776c5.027,5.016,11.706,7.783,18.812,7.785c7.102,0,13.781-2.77,18.804-7.785
		c5.023-5.015,7.79-11.682,7.79-18.776c0-7.093-2.768-13.764-7.79-18.778C40.392,239.866,33.712,237.102,26.61,237.102z"/>
  <path d="M100.985,182.318c-3.502,3.499-9.232,3.499-12.734,0.001l-8.81-8.801c-3.502-3.498-3.502-9.223,0-12.721L229.832,10.564
		c3.502-3.498,10.401-6.727,15.33-7.175l36.862-3.352c4.93-0.448,8.596,3.218,8.148,8.148l-3.346,36.791
		c-0.448,4.93-3.68,11.825-7.182,15.324l-150.4,150.251c-3.502,3.498-9.232,3.498-12.734,0l-8.822-8.813
		c-3.502-3.498-3.502-9.223,0-12.722L233.608,63.213c1.854-1.848,1.856-4.852,0.003-6.702c-1.848-1.853-4.853-1.853-6.709-0.002
		L100.985,182.318z"/>
</g>
</svg>
                <svg v-else version="1.0" xmlns="http://www.w3.org/2000/svg"
                     width="32px" height="32px" viewBox="0 0 1200.000000 1200.000000"
                     preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                     fill="#000000" stroke="none">
                    <path d="M593 12786 c-92 -18 -177 -45 -289 -94 l-89 -38 3 -65 c11 -212 84
-441 198 -616 55 -84 225 -250 325 -316 48 -32 129 -79 180 -106 89 -47 368
-166 374 -159 1 2 27 167 57 368 l55 365 -34 39 c-78 93 -99 185 -86 379 7
111 6 130 -7 137 -34 18 -230 80 -300 95 -104 23 -297 28 -387 11z"/>
                    <path d="M1634 12296 c-57 -29 -164 -130 -164 -155 0 -9 -16 -185 -35 -391
-37 -393 -29 -340 -709 -4747 -45 -293 -79 -533 -75 -533 4 0 65 22 136 49
l128 49 18 104 c9 56 78 492 152 968 75 476 158 1007 185 1180 63 403 196
1253 261 1665 94 602 128 810 144 869 37 141 105 286 300 642 l40 71 -20 38
c-32 58 -106 147 -153 179 -60 43 -138 47 -208 12z"/>
                    <path d="M1941 11723 c-73 -75 -129 -175 -155 -278 -17 -67 -42 -253 -35 -260
9 -8 244 -64 399 -94 85 -17 360 -64 610 -106 533 -88 807 -140 1055 -200 827
-200 1308 -490 1473 -887 126 -303 62 -714 -178 -1138 l-50 -89 269 -438 c147
-241 272 -437 277 -436 9 2 768 294 770 297 1 0 -69 127 -156 281 -144 255
-157 282 -144 300 153 222 265 427 313 572 77 232 97 420 65 631 -67 451 -381
872 -914 1226 -219 146 -496 287 -695 354 -102 35 -219 46 -880 82 -928 52
-1339 100 -1803 215 -79 19 -146 35 -149 35 -3 0 -35 -30 -72 -67z"/>
                    <path d="M7485 8813 c-154 -3 -409 -19 -600 -39 -150 -15 -474 -60 -480 -66
-1 -2 161 -91 361 -198 200 -107 364 -197 364 -200 0 -3 -184 -76 -408 -162
-450 -173 -819 -316 -1472 -568 -239 -92 -563 -218 -720 -278 -157 -61 -613
-237 -1015 -392 -401 -155 -810 -313 -908 -351 -98 -38 -185 -69 -193 -69 -7
0 -150 76 -318 169 l-304 170 -54 -21 c-52 -20 -1392 -537 -1620 -625 -65 -25
-118 -49 -118 -52 0 -3 152 -58 339 -121 l339 -115 433 -368 c331 -280 439
-366 454 -362 11 2 186 69 388 147 l368 143 128 288 c71 159 132 292 137 297
5 4 137 58 294 118 267 103 1399 540 2025 782 154 59 609 235 1010 390 402
155 856 331 1010 390 425 164 388 151 380 132 -11 -27 -275 -775 -275 -778 0
-5 239 167 375 270 353 266 770 637 1078 959 236 247 371 397 364 404 -18 18
-417 69 -677 87 -225 16 -481 23 -685 19z"/>
                    <path d="M6475 7469 c-55 -22 -224 -87 -375 -145 -151 -59 -276 -107 -277
-108 -3 -2 185 -986 191 -1002 3 -7 42 -24 88 -39 279 -92 528 -235 688 -395
334 -332 357 -780 70 -1385 -172 -364 -431 -741 -1020 -1485 -325 -410 -431
-550 -521 -687 l-69 -107 57 -50 c175 -157 303 -216 469 -216 l81 0 58 88 c81
122 295 406 405 537 196 234 416 469 901 960 475 482 496 508 595 735 179 414
274 831 275 1205 0 302 -47 525 -156 740 -194 379 -560 631 -1089 750 l-100
22 -71 309 c-51 218 -76 310 -86 311 -8 1 -59 -16 -114 -38z"/>
                    <path d="M580 5858 c-46 -74 -40 -146 20 -264 l44 -84 1205 -1008 c663 -555
1665 -1393 2226 -1862 647 -541 1134 -956 1332 -1136 l312 -284 89 0 c140 0
211 35 253 125 22 48 25 171 5 255 -11 49 -16 56 -47 67 -19 7 -119 42 -224
78 -211 74 -395 158 -498 229 -38 26 -710 585 -1495 1244 -785 658 -1823 1529
-2306 1934 -484 406 -883 738 -888 738 -5 0 -17 -15 -28 -32z"/>
                    <path d="M671 5029 c-84 -144 -151 -262 -149 -264 5 -5 608 229 611 237 2 5
-49 53 -289 270 l-21 18 -152 -261z"/>
                    <path d="M4994 1543 c-134 -283 -186 -455 -203 -675 -15 -183 13 -343 87 -517
49 -113 95 -187 218 -350 6 -7 217 70 288 106 201 100 373 284 492 525 l38 77
-110 113 c-130 133 -163 191 -171 302 l-6 71 -234 190 c-129 105 -259 209
-288 233 l-55 43 -56 -118z"/>
                  </g>
                </svg>
                <v-btn @click="removeSolider(solider)" text><v-icon>mdi-delete</v-icon></v-btn>
              </div>
            </v-card>
          </v-card>
        </div>
        <div class="my-2">
          <v-card v-for="(solider, index) in aliveSolders.filter(sol => sol.teamId === 1).sort((a,b) => {
            if (a.agility > b.agility) return -1;
            if (a.agility < b.agility) return 1;
            return 0;
          })" :key="index" width="200" style="padding: 10px;color: white"
                  :color="solider.teamId === 0 ? '#f00' : '#00f'"
          >
            <v-card class="pa-2">
              <div style="display: flex;flex-direction: row;">
                <div><span class="font-weight-bold">Name: </span> {{ solider.name }}</div>
              </div>
              <div style="display: flex;flex-direction: row;">
                <v-text-field label="Életpont" type="number" v-model="solider.health"/>
                <v-text-field label="Agility" type="number" v-model="solider.agility"/>
              </div>
              <div style="display: flex;flex-direction: row;">
                <v-text-field label="Attack power" type="number" v-model="solider.power"/>
                <v-text-field label="Defense" type="number" v-model="solider.defense"/>
              </div>
              <div style="display: flex;flex-direction: row;">
                <v-text-field label="Y" type="number" v-model="solider.y"/>
                <v-text-field label="X" type="number" v-model="solider.x"/>
              </div>
              <div style="display: flex;flex-direction: row;">
                <svg v-if="solider.class === 'SWORDMAN'" fill="#000000" height="32px" width="32px"
                     viewBox="0 0 300.226 300.226" xml:space="preserve">
<g>
	<path d="M63.951,243.575c-1.945-3.578-4.401-6.907-7.363-9.869c-3.106-3.102-6.626-5.633-10.4-7.63
		c-4.51-2.387-0.945-7.5-0.945-7.5c4.616-7.023,8.825-14.079,12.305-20.226l-23.363-23.344H11.504c-4.362,0-7.898-3.539-7.898-7.902
		c0-4.361,3.536-7.9,7.898-7.9h25.947c2.1,0,4.107,0.832,5.588,2.312l85.379,85.291c1.483,1.483,2.315,3.495,2.315,5.589v26.073
		c0,4.365-3.537,7.897-7.9,7.897c-4.367,0-7.904-3.531-7.904-7.897v-22.798l-23.27-23.24c-6.281,3.707-13.582,8.252-20.816,13.25
		C70.842,245.679,66.698,248.629,63.951,243.575z"/>
  <path d="M26.61,237.102c-7.106,0-13.784,2.764-18.812,7.784c-5.019,5.015-7.782,11.686-7.782,18.778
		c0,7.097,2.764,13.762,7.782,18.776c5.027,5.016,11.706,7.783,18.812,7.785c7.102,0,13.781-2.77,18.804-7.785
		c5.023-5.015,7.79-11.682,7.79-18.776c0-7.093-2.768-13.764-7.79-18.778C40.392,239.866,33.712,237.102,26.61,237.102z"/>
  <path d="M100.985,182.318c-3.502,3.499-9.232,3.499-12.734,0.001l-8.81-8.801c-3.502-3.498-3.502-9.223,0-12.721L229.832,10.564
		c3.502-3.498,10.401-6.727,15.33-7.175l36.862-3.352c4.93-0.448,8.596,3.218,8.148,8.148l-3.346,36.791
		c-0.448,4.93-3.68,11.825-7.182,15.324l-150.4,150.251c-3.502,3.498-9.232,3.498-12.734,0l-8.822-8.813
		c-3.502-3.498-3.502-9.223,0-12.722L233.608,63.213c1.854-1.848,1.856-4.852,0.003-6.702c-1.848-1.853-4.853-1.853-6.709-0.002
		L100.985,182.318z"/>
</g>
</svg>
                <svg v-else version="1.0" xmlns="http://www.w3.org/2000/svg"
                     width="32px" height="32px" viewBox="0 0 1200.000000 1200.000000"
                     preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                     fill="#000000" stroke="none">
                    <path d="M593 12786 c-92 -18 -177 -45 -289 -94 l-89 -38 3 -65 c11 -212 84
-441 198 -616 55 -84 225 -250 325 -316 48 -32 129 -79 180 -106 89 -47 368
-166 374 -159 1 2 27 167 57 368 l55 365 -34 39 c-78 93 -99 185 -86 379 7
111 6 130 -7 137 -34 18 -230 80 -300 95 -104 23 -297 28 -387 11z"/>
                    <path d="M1634 12296 c-57 -29 -164 -130 -164 -155 0 -9 -16 -185 -35 -391
-37 -393 -29 -340 -709 -4747 -45 -293 -79 -533 -75 -533 4 0 65 22 136 49
l128 49 18 104 c9 56 78 492 152 968 75 476 158 1007 185 1180 63 403 196
1253 261 1665 94 602 128 810 144 869 37 141 105 286 300 642 l40 71 -20 38
c-32 58 -106 147 -153 179 -60 43 -138 47 -208 12z"/>
                    <path d="M1941 11723 c-73 -75 -129 -175 -155 -278 -17 -67 -42 -253 -35 -260
9 -8 244 -64 399 -94 85 -17 360 -64 610 -106 533 -88 807 -140 1055 -200 827
-200 1308 -490 1473 -887 126 -303 62 -714 -178 -1138 l-50 -89 269 -438 c147
-241 272 -437 277 -436 9 2 768 294 770 297 1 0 -69 127 -156 281 -144 255
-157 282 -144 300 153 222 265 427 313 572 77 232 97 420 65 631 -67 451 -381
872 -914 1226 -219 146 -496 287 -695 354 -102 35 -219 46 -880 82 -928 52
-1339 100 -1803 215 -79 19 -146 35 -149 35 -3 0 -35 -30 -72 -67z"/>
                    <path d="M7485 8813 c-154 -3 -409 -19 -600 -39 -150 -15 -474 -60 -480 -66
-1 -2 161 -91 361 -198 200 -107 364 -197 364 -200 0 -3 -184 -76 -408 -162
-450 -173 -819 -316 -1472 -568 -239 -92 -563 -218 -720 -278 -157 -61 -613
-237 -1015 -392 -401 -155 -810 -313 -908 -351 -98 -38 -185 -69 -193 -69 -7
0 -150 76 -318 169 l-304 170 -54 -21 c-52 -20 -1392 -537 -1620 -625 -65 -25
-118 -49 -118 -52 0 -3 152 -58 339 -121 l339 -115 433 -368 c331 -280 439
-366 454 -362 11 2 186 69 388 147 l368 143 128 288 c71 159 132 292 137 297
5 4 137 58 294 118 267 103 1399 540 2025 782 154 59 609 235 1010 390 402
155 856 331 1010 390 425 164 388 151 380 132 -11 -27 -275 -775 -275 -778 0
-5 239 167 375 270 353 266 770 637 1078 959 236 247 371 397 364 404 -18 18
-417 69 -677 87 -225 16 -481 23 -685 19z"/>
                    <path d="M6475 7469 c-55 -22 -224 -87 -375 -145 -151 -59 -276 -107 -277
-108 -3 -2 185 -986 191 -1002 3 -7 42 -24 88 -39 279 -92 528 -235 688 -395
334 -332 357 -780 70 -1385 -172 -364 -431 -741 -1020 -1485 -325 -410 -431
-550 -521 -687 l-69 -107 57 -50 c175 -157 303 -216 469 -216 l81 0 58 88 c81
122 295 406 405 537 196 234 416 469 901 960 475 482 496 508 595 735 179 414
274 831 275 1205 0 302 -47 525 -156 740 -194 379 -560 631 -1089 750 l-100
22 -71 309 c-51 218 -76 310 -86 311 -8 1 -59 -16 -114 -38z"/>
                    <path d="M580 5858 c-46 -74 -40 -146 20 -264 l44 -84 1205 -1008 c663 -555
1665 -1393 2226 -1862 647 -541 1134 -956 1332 -1136 l312 -284 89 0 c140 0
211 35 253 125 22 48 25 171 5 255 -11 49 -16 56 -47 67 -19 7 -119 42 -224
78 -211 74 -395 158 -498 229 -38 26 -710 585 -1495 1244 -785 658 -1823 1529
-2306 1934 -484 406 -883 738 -888 738 -5 0 -17 -15 -28 -32z"/>
                    <path d="M671 5029 c-84 -144 -151 -262 -149 -264 5 -5 608 229 611 237 2 5
-49 53 -289 270 l-21 18 -152 -261z"/>
                    <path d="M4994 1543 c-134 -283 -186 -455 -203 -675 -15 -183 13 -343 87 -517
49 -113 95 -187 218 -350 6 -7 217 70 288 106 201 100 373 284 492 525 l38 77
-110 113 c-130 133 -163 191 -171 302 l-6 71 -234 190 c-129 105 -259 209
-288 233 l-55 43 -56 -118z"/>
                  </g>
                </svg>
                <v-btn @click="removeSolider(solider)" text><v-icon>mdi-delete</v-icon></v-btn>
              </div>
            </v-card>
          </v-card>
        </div>
      </div>
    </div>
    <div>
      <svg
        :width="gameMap.width * tileSize"
        :height="gameMap.height * tileSize"
      >
      <!-- tiles -->
        <g>
          <g v-for="(row, y) in gameMap.mapByTiles" :key="y">
            <rect
              v-for="(tile, x) in row" :key="x"
              :x="x * tileSize"
              :y="y * tileSize"
              :width="tileSize"
              :height="tileSize"
              :fill="tile.type === 'GRASS' ? '#0f0' :
              // ground is brown
              tile.type === 'GROUND' ? '#a52a2a' :
              '#000'"
              :class="`${editingMap ? 'tileHover' : ''}`"
              @click="changeTileType(x,y)"
            />
            <!-- stroke="#000" -->
          </g>
        </g>

        <!-- solders -->
        <g v-for="(solider, index) in aliveSolders" :key="index"
          :transform="'translate(' + solider.x * tileSize + ',' + solider.y * tileSize + ')'"
           class="tileHover"
        >
          <circle
            :fill="solider.teamId === 0 ? 'grey' : 'lightblue'"
            stroke="#000"
            :cx="tileSize / 2"
            :cy="tileSize / 2"
            :r="tileSize / 2"
          />

          <g>
            <image :style="`width: ${tileSize/1.1};height: ${tileSize/1.1}`"
                   :href="solider.class === 'SWORDMAN' ? 'https://www.svgrepo.com/download/152773/sword.svg' :
                   'https://svgsilh.com/svg/309907.svg'"/>

            <!-- life bar to show how much lifepoint is have to this solider -->
            <rect
              :x="0"
              :y="tileSize / 1.1"
              :width="tileSize"
              :height="tileSize / 10"
              fill="red"
              :transform="`scale(${solider.health / 100}, 1)`"
            />

            <!-- with hover show the name of the solider -->
            <text
              class="hoverDisplay"
              :x="tileSize / 2"
              :y="tileSize / 1.1"
              :text-anchor="`middle`"
              :fill="`white`"
              :transform="`translate(0, ${tileSize / 1.1})`"
            >
              {{solider.health}}
            </text>
          </g>
        </g>

      </svg>
    </div>
  </div>
</template>

<script>
import Solider from '~/api/Solider';
import GameMap from '~/api/GameMap';
import Tile from '~/api/Tile';
export default {
  name: 'IndexPage',
  mounted() {
    // create map from GameMap
    this.gameMap = new GameMap(this.mapSize,this.mapSize,true);
    // generate soliders by 2 teams
    const teamCounts = 2;
    const soliderCounts = 10;
    for (let i = 0; i < teamCounts; i++) {
      for (let j = 0; j < soliderCounts; j++) {
        this.createNewSolider(j+1,`solider-${j+1+'-'+i}`,i);
      }
    }

    // init game
    this.generated = true;
    //this.initGame();
  },

  data() {
    return {
      generated: false,
      solders: [],
      gameMap: null,
      interval: null,
      tileSize: 20,
      started: false,
      speedOfRound: 200,
      mapSize: 20,
      editingMap: false,
      selectedTileOption: 0,
      tileOptions: [
        { color: 'green', text: 'Füves', value: 'GRASS' },
        { color: 'brown', text: 'Föld', value: 'GROUND' },
        { color: 'grey', text: 'Fal', value: 'WALL' },
      ]
    }
  },
  computed: {
    aliveSolders() {
      return this.solders.filter(solider => solider.health > 0)
        .sort((a,b) => a.agility + b.agility);
    },
    haveAnyDifferentTeamMate() {
      return this.aliveSolders.filter(solider => solider.teamId !== this.aliveSolders[0].teamId).length > 0;
    }
  },
  methods: {
    initGame() {
      this.started = true;
      this.interval = setInterval(() => {
        this.aliveSolders.forEach(solider => {
          let soliderIndexOfSolders = this.solders.findIndex(s => s.id === solider.id && s.teamId === solider.teamId);
          // find the closest enemy target
          let target = this.aliveSolders.filter(s => s.teamId !== solider.teamId)
            .sort((a,b) => {
              const distanceA = this.gameMap.getDistance(a.x, a.y, solider.x, solider.y)
              const distanceB = this.gameMap.getDistance(b.x, b.y, solider.x, solider.y)
              return distanceA - distanceB;
            })[0];
          let targetOfSolders = this.solders.findIndex(s => s.id === target.id && s.teamId === target.teamId);

          // get alive solders expet current solider
          const aliveSolders = this.aliveSolders.filter(s => s.id !== solider.id && s.teamId === solider.teamId);
          // check is in attack range, attack range is 1px
          const distant = this.gameMap.getDistance(solider.x, solider.y, target.x, target.y,aliveSolders);
          if ([1,2].includes(distant)) {
            // attack
            target = solider.attack(target);
            if (target.death) {
              // remove target
              this.solders.splice(targetOfSolders,1);
            } else {
              // update target in solders
              this.solders[targetOfSolders] = target;
            }
          } else {
            // move
            let path = this.gameMap.getPath(solider.x,solider.y,target.x,target.y,aliveSolders);
            if (path.length > 1) {
              path = path[1];
              solider.x = path[0];
              solider.y = path[1];
              this.solders[soliderIndexOfSolders] = solider;
            }
          }
        });
      }, this.speedOfRound);
    },
    createNewSolider(id,name,teamId) {
      // pick up random walkable cooridantes
      const walkableCooridantes = this.suffleWalkableCoordinates();
      const [x,y] = walkableCooridantes[0];
      this.solders.push(new Solider({
        id: id,
        name: name,
        health: 100,
        teamId: teamId,
        x: x,
        y: y,
      }));
    },
    suffleWalkableCoordinates() {
      let walkableCooridantes = this.gameMap.getWalkableCooridantes();
      walkableCooridantes = walkableCooridantes.sort(() => Math.random() - 0.5);
      return walkableCooridantes;
    },
    stopGame() {
      clearInterval(this.interval);
      this.started = false;
    },
    removeSolider(solider) {
      const index = this.solders.findIndex(s => s.id === solider.id && s.teamId === solider.teamId);
      this.solders.splice(index,1);
    },
    stepSelectedTileOption() {
      this.selectedTileOption++;
      if (this.selectedTileOption >= this.tileOptions.length) {
        this.selectedTileOption = 0;
      }
    },
    changeTileType(x,y) {
      this.gameMap.mapByTiles[y][x] = new Tile(this.tileOptions[this.selectedTileOption].value,x,y);
      this.gameMap.generateMapByKeys();
      this.editingMap = false;
      this.editingMap = true;
    },
  },
  watch: {
    haveAnyDifferentTeamMate(value) {
      if (!value) {
        this.stopGame();
      }
    }
  },
}
</script>

<style>
#game {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#stands {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

#stands > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#menuLine {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.tileHover text{
  display: none;
  fill: black;
  stroke: black;
}

/* hover on partent, toggle children display */
.tileHover:hover text {
  display: block;
}
</style>
