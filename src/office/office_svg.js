import { SVG } from '@svgdotjs/svg.js';
import rawSVG from '@/office/raw_svg';
// alert('test message');
export class OfficeDrawer {
    constructor (x1, y1, x2, y2, direction) {
        this.id = 1; // TODO insert proper value
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.direction = direction;
        this.desk = null;
    }
    render () {
        this.desk = SVG(rawSVG.desk);
        const desk = this.desk;
        desk.addClass('svg-workspace ' + this.direction);
        desk.node.setAttribute('data-id', this.id);
        if (this.direction === 'north' || this.direction === 'south') {
            desk.node.style = `top: ${this.x1}; left: ${this.y1}; width: ${this.x2 - this.x1}; height: ${this.y2 - this.y1}`;
        } else if (this.direction ===  'west' || this.direction === 'east') {
            desk.node.style = `top: ${this.x1}; left: ${this.y1}; width: ${this.y2 - this.y1}; height: ${this.x2 - this.x1}`;
        }
        desk.addTo('#officeCanvas');
    }
    addEvent($vue) {
        this.desk.click((evt) => {
            $vue.$emit('showObjectInfo', evt)
        });
    }
}

export default OfficeDrawer;

