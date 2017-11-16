export function CustomMarker(latlng,  map, PARAM1, PARAM2) {
    this.latlng_ = latlng;
    this.CustomParam1 = PARAM1;
    this.CustomParam2 = PARAM2;
    this.setMap(map);
}
CustomMarker.prototype.draw = function() {
    var me = this;
    var div = this.div_;
    if (!div) {
        div = this.div_ = document.createElement('DIV');
        
        // Maybe Custom Param 1 is a class name
        div.className = this.CustomParam1;
        // And Param 2 is some content for the marker
        div.contentText = this.CustomParam2;
        
        div.style.border = '2px solid blue';
        div.style.position = 'absolute';
        div.style.paddingLeft = '0px';
        div.style.cursor = 'pointer';
        div.style.width = '10px';
        div.style.height = '10px';
        
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }
    var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};