require(['jquery', 'vector-map', 'vector-map-veneto'], function(){
    $(document).ready(function(){
        var dataformap = {};
        var markersValue = []
        var vv = []
        $.each(tablecodicicomuni, function( index, row ) {
            if (index !=0) {
                dataformap[row[0]] = 0;
            }
        });

        $.each(tablesituazionecomuni, function( index, row ) {
            if (index !=0) {
                nomecomune = row[0];
                v = parseInt(row[1]);
                if (isNaN(v)){
                    v = 0;
                }
                if (codicicomuni.hasOwnProperty(nomecomune)) {
                    v1 = each1000people(codicicomuni[nomecomune],v);
                    dataformap[codicicomuni[nomecomune]]=v; //v1;
                    lats = row[2].split('.');
                    lons = row[3].split('.');
                    var lat = ""
                    for (var i = 0; i < lats.length; i++) {
                        if (i == 1) {
                            lat = lat + "." + lats[i];
                        } else {
                            lat = lat + lats[i];
                        }
                    }
                    var lon = ""
                    for (var i = 0; i < lons.length; i++) {
                        if (i == 1) {
                            lon = lon + "." + lons[i];
                        } else {
                            lon = lon + lons[i];
                        }
                    }      

                    m = {latLng: [lat, lon], name: nomecomune, r:v};
                    markersValue.push(m);
                    vv.push(v);
                } 
            }
        });
        $('#map-veneto-svg-points').vectorMap({
            map: 'comuni_veneti_merc',
            zoomButtons : true,
            zoomOnScroll: false,
            panOnDrag: true,
            backgroundColor: 'transparent',
            scaleColors: ['#fd9644', '#653c1b'],
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.7,
            hoverColor: false,
            regionStyle: {
                initial: {
                    fill: '#F4F4F4',
                    stroke: "bfbfbf",
                }
            },
            markerStyle: {
              initial: {
                    fill: '#ef5d68',
                    stroke: '#fd9644',
                    "fill-opacity": 0.8,
                    "stroke-width": 1,
                    "stroke-opacity": 1,
                  },
                hover: {
                    stroke: '#653c1b',
                    "stroke-width": 2,
                    cursor: 'pointer'
                  }
            },
            /*
            labels: {
                render: function(code){
                    console.log(code);
                    return(code);
                },
                offsets: function(code){
                  return {
                    115: [46.1668,11.8126]
                  }[code];
                }
            },*/
            markers: markersValue, 
            series: {
                markers: [{
                    attribute: 'fill',
                },{
                    attribute: 'r',
                    scale: [3, 19],
                    values: vv //markersValue
                }]
            },
            onMarkerTipShow: function(event, label, index){
                label.html(
                  '<b>'+markersValue[index].name+'</b><br/>'+
                  '<b>contagi: </b>'+markersValue[index].r+'</br>'
                );
            },
            onRegionTipShow: function(e, el, code){
                e.preventDefault();
            },
        });
    });
});
