require(['jquery', 'vector-map', 'vector-map-veneto'], function(){
    $(document).ready(function(){
        var markers = []
        var dataformap = {};
    	var indicatore = "contagi ogni 1.000 abitanti";
    	if (choosemapindicator == "assoluto") {
    		indicatore = "totale contagi";
    	}
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
                    showdata = v;
                    if (choosemapindicator == "relativo") {
                        showdata = v1;
                        $("#mapindicator").text(labelrelativo);
                    }
                    dataformap[codicicomuni[nomecomune]]= showdata;
                    m = {latLng: [row[2], row[3]], name: nomecomune};
                    markers.push(m);
                } 
            }
        });    
        $('#map-veneto-svg').vectorMap({
            map: 'comuni_veneti_merc',
            zoomButtons : true,
            zoomOnScroll: true,
            panOnDrag: true,
            backgroundColor: 'transparent',
            onRegionTipShow: function(event, label, index, f){
                label.html(label.html() + (dataformap[index] ? '<br/>'+ indicatore +':<br/>' + dataformap[index].toString().replace(".",",")+'' : ''));
            },
            series: {
                regions: [{
                    values: dataformap,
                    scale: ['#EFF3F6', tabler.colors.orange],
                    normalizeFunction: 'polynomial', //
                    /*
                    legend: {
                      horizontal: true,
                      cssClass: 'jvectormap-legend-icons'
                    }*/
                }]
            },
            regionStyle: {
                initial: {
                    fill: '#EFF3F6',
                    stroke: "#545454"
                }
            }
        });
    });
});
