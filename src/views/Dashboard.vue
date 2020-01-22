<template>
    <v-app>
        <Drawer/>
        <v-layout row>
            <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
                <v-container fill-height>
                    <v-layout row justify-center align-center>
                        <v-progress-circular indeterminate :size="100" :width="20"
                                             color="primary"/>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>
        <v-card
                class="mx-auto">
            <div class="pt-12"/>
            <v-btn class="blue white--text v-btn--block" @click="makeOfficeEditable">{{ btnEditText }}</v-btn>
            <v-card
                    class="mx-auto"
                    v-if="isOfficeEditable"
            >
                <v-list two-line>
                    <v-subheader class="text-uppercase grey white--text">available options</v-subheader>
                    <v-list-item-group
                    >
                        <v-list-item
                                v-for="{title, icon, subtitle, mode} in officeEditOptions" :key="title"
                                @click="movable.mode = mode"
                        >
                            <v-list-item-icon>
                                <v-icon class="blue--text" v-text="icon"/>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="title"/>
                                <v-list-item-subtitle v-html="subtitle"/>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
            <v-divider class="pa-4"/>
            <div
                    class="office-room"
                    id="officeCanvas"
                    ref="officeCanvas"
                    @mousemove="handleMouseMove"
                    @mouseup="handleMouseUp"
            >
                <template v-for="({style, cssClass, index, id}) in officeInfo">
                    <div
                            v-bind:key="style"
                            @mousedown="handleMouseDown"
                            @mouseup="handleMouseUp"
                    >
                        <Desk v-bind:style="style" :class="cssClass"
                              v-bind:data-index="index"
                              v-on:click.native="showDetails(id)"
                        />
                    </div>
                </template>
            </div>
            <div ref="container"></div>
            <div class="pb-12"/>
            <v-bottom-sheet v-model="showDetailInformation">
                <v-sheet class="text-center" height="300px">
                    <v-btn
                            class="mt-6 blue white--text"
                            text
                            @click="showDetailInformation = !showDetailInformation"
                    >close
                    </v-btn>

                    <div class="py-3">
                        <v-simple-table height="200px" width="100px">
                            <template>
                                <tbody>
                                <tr v-for="item in detailData" :key="item">
                                    <td class="text-uppercase font-weight-bold">{{ item.key }}</td>
                                    <td>{{ item.value }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </v-card>
        <v-dialog
                v-model="movable.removeElementDialog"
                max-width="330"
        >
            <v-card>
                <v-card-title class="headline">Are you sure, you want to remove the element?</v-card-title>

                <v-card-text>
                    This action will remove the element permanently from the office, you cannot back this action.
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            text
                            class="blue white--text"
                            @click="movable.removeElementDialog = false"
                    >
                        Go back
                    </v-btn>

                    <v-btn
                            class="red white--text"
                            text
                            @click="removeElementFromOffice"
                    >
                        Remove
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
                v-model="snackbar.show"
                v-if="snackbar.show"
                :timeout="3000"
                :color="snackbar.type"
                multi-line
        >
            {{ snackbar.message }}
            <v-btn
                    :color="snackbar.color"
                    text
                    @click="snackbar.show = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>
<script>
    import Drawer from '../components/core/Drawer';
    import Desk from "@/components/officeElements/Desk";

    export default {
        name: 'Dashboard',
        data() {
            return {
                snackbar: {
                    show: false,
                    type: 'success',
                    message: '',
                    color: '',
                },
                officeEditOptions: [
                    {
                        'title': 'Move',
                        'icon': 'mdi-arrow-all',
                        'mode': 'movable',
                        'subtitle': 'Move element in the office'
                    },
                    {
                        'title': 'Rotate',
                        'icon': 'mdi-autorenew',
                        'mode': 'rotate',
                        'subtitle': 'Rotate element clockwise'
                    },
                    {
                        'title': 'Remove',
                        'icon': 'mdi-account-remove',
                        'mode': 'remove',
                        'subtitle': 'Remove element for the office'
                    }
                ],
                isOfficeEditable: false,
                btnEditText: 'Edit office',
                loading: false,
                officeRendered: false,
                currentAlert: null,
                dataOffice: null,
                officeInfo: [],
                showDetailInformation: false,
                detailData: [],
                movable: {
                    removeElementDialog: false,
                    mode: '',
                    currentElement: null,
                    offsetLeft: 0,
                    offsetTop: 0,
                    boundary: {
                        left: 0,
                        right: 1000,
                        top: 0,
                        bottom: 1000,
                    }
                }

            };
        },
        components: {
            Drawer, Desk
        },
        created() {
            this.renderOffice();
        },
        methods: {
            renderOffice: async function () {
                this.loading = false;
                const response = await this.axios.get(this.$store.getters.officeRoute);
                const officeInfo = [];
                response.data.forEach((v, i) => {
                    const pieceOfInfo = {};
                    pieceOfInfo.index = i;
                    pieceOfInfo.id = v.id;
                    pieceOfInfo.name = v.name;
                    const rotation = v.rotation || 'NORTH';
                    pieceOfInfo.cssClass = "svg-workspace " + rotation.toLowerCase();
                    pieceOfInfo.direction = rotation.toLowerCase();
                    pieceOfInfo.style = 'width: 200px;';
                    const x1 = v.x1Position, y1 = v.y1Position, x2 = v.x2Position, y2 = v.y2Position;
                    let width = 0;
                    let height = 0;
                    if (rotation === 'NORTH' || rotation === 'SOUTH') {
                        width = x2 - x1;
                        height = y2 - y1;
                    } else if (rotation === 'WEST' || rotation === 'EAST') {
                        width = y2 - y1;
                        height = x2 - x1;
                    }
                    pieceOfInfo.style = `left: ${x1}; top: ${y1}; width: ${width}; height: ${height}`;
                    pieceOfInfo.width = width;
                    pieceOfInfo.height = height;
                    pieceOfInfo.bounds = {
                        x1,
                        x2,
                        y1,
                        y2
                    };

                    pieceOfInfo.detailedData = [
                        {
                            key: 'name',
                            value: v.name
                        },
                        {
                            key: 'username',
                            value: v.user.email.split('@')[0]
                        },
                        {
                            key: 'email',
                            value: v.user.email
                        },
                        {
                            key: 'first name',
                            value: v.user.name
                        },
                        {
                            key: 'surname',
                            value: v.user.surname
                        },
                        {
                            key: 'country',
                            value: v.user.country
                        },
                    ];

                    officeInfo.push(pieceOfInfo);
                });
                this.officeInfo = officeInfo;
                this.loading = false;
            },
            showSnackbar(message, type, color) {
                this.snackbar.message = message;
                this.snackbar.type = type;
                this.snackbar.color = color;
                this.snackbar.show = true;
            },
            showDetails: function (id) {
                if (this.isOfficeEditable)
                    return;
                let foundData = null;
                for (const data of this.officeInfo) {
                    if (data.id === id) {
                        foundData = data.detailedData;
                        break;
                    }
                }
                this.detailData = foundData;
                this.showDetailInformation = true;
                // window.console.log(element);
            },
            async makeOfficeEditable() {
                if (this.isOfficeEditable) {
                    this.loading = true;
                    this.btnEditText = 'Edit office';
                    this.movable.mode = '';
                    this.isOfficeEditable = false;
                    this.$refs.officeCanvas.classList.remove('editable-office');

                    // await this.axios.delete(this.$store.getters.updateWorkstation(el.id));
                    try {
                        for (let el of this.officeInfo) {
                            await this.axios.put(this.$store.getters.updateWorkstation(el.id), {
                                'id': el.id,
                                'name': el.name,
                                'x1Position': el.bounds.x1,
                                'y1Position': el.bounds.y1,
                                'x2Position': el.bounds.x1,
                                'y2Position': el.bounds.y2,
                                'user': {
                                    'username': el.detailedData.username
                                }
                            });
                        }
                        this.showSnackbar('Office updated successfully', 'success', 'green');
                    } catch (e) {
                        this.showSnackbar('Error occurred while updating the office', 'error', 'red');
                    } finally {
                        this.loading = false;
                    }
                } else {
                    this.btnEditText = 'Save office';
                    this.isOfficeEditable = true;
                    this.$refs.officeCanvas.classList.add('editable-office');
                }
            },
            getSvgElementFromEvent(evt) {
                if (evt.target.farthestViewportElement !== null) {
                    return evt.target.farthestViewportElement;
                } else {
                    return evt.target;
                }
            },
            async removeElementFromOffice() {
                this.movable.removeElementDialog = false;
                const el = this.movable.currentElement;
                try {
                    await this.axios.delete(this.$store.getters.updateWorkstation(el.id));
                    this.showSnackbar('Element removed successfully', 'success', 'green');
                    const svgIndex = Number.parseInt(this.movable.currentElement.dataset.index);
                    this.officeInfo.splice(svgIndex, 1);
                } catch (e) {
                    this.showSnackbar('Error occurred while removing element', 'error', 'red');
                }
            },
            handleMouseDown(evt) {
                if (!this.isOfficeEditable) return;
                const currentElement = this.getSvgElementFromEvent(evt);
                if (!currentElement) {
                    return;
                }
                this.movable.currentElement = currentElement;
                if (this.movable.mode === 'movable') {
                    this.modeMovable(evt);
                } else if (this.movable.mode === 'rotate') {
                    this.rotateElement(evt);
                } else if (this.movable.mode === 'remove') {
                    this.movable.removeElementDialog = true;
                }
            },
            modeMovable(evt) {
                const elementCoords = this.$refs.officeCanvas.getBoundingClientRect();
                this.movable.offsetLeft = elementCoords.left + evt.offsetX;
                this.movable.offsetTop = elementCoords.top + evt.offsetY;
                const svgBoundary = this.movable.currentElement.getBoundingClientRect();
                this.movable.boundary.tright = this.movable.boundary.right - svgBoundary.width;
                this.movable.boundary.tbottom = this.movable.boundary.bottom - svgBoundary.height;
                this.movable.currentElement.classList.add('dragged');
                this.movable.oldTop = this.movable.currentElement.style.top;
                this.movable.oldLeft = this.movable.currentElement.style.left;
            },
            // eslint-disable-next-line no-unused-vars
            handleMouseMove(evt) {
                if (!this.isOfficeEditable) return;
                if (this.movable.mode !== 'movable') {
                    return;
                }
                if (!this.movable.currentElement) {
                    return;
                }

                const ce = this.movable.currentElement;
                const currentX = evt.clientX - this.movable.offsetLeft;
                const currentY = evt.clientY - this.movable.offsetTop;
                this.setElementPosition(ce, currentX, currentY);
            },
            // eslint-disable-next-line no-unused-vars
            handleMouseUp(evt) {
                if (!this.isOfficeEditable) return;
                if (this.movable.mode !== 'movable') return;
                if (!this.movable.currentElement) {
                    return;
                }
                const getValOfProperty = (prop) => {
                    if (prop) {
                        return Number.parseInt(prop.split("px")[0])
                    }
                    return 0;
                };
                // window.console.log(evt);
                this.movable.currentElement.classList.remove('dragged');
                const svgIndex = Number.parseInt(this.movable.currentElement.dataset.index);
                const svgInfo = this.officeInfo[svgIndex];
                // validate position
                const currentX = getValOfProperty(this.movable.currentElement.style.left);
                const currentY = getValOfProperty(this.movable.currentElement.style.top);
                const currSvgBounds = {
                    x1: currentX,
                    y1: currentY,
                    x2: currentX + svgInfo.width,
                    y2: currentY + svgInfo.height,
                };
                const between = (p, p1, p2) => p > p1 && p < p2;
                let isValidPosition = true;
                for (let i = 0; i < this.officeInfo.length; i++) {
                    if (i === svgIndex) {
                        continue;
                    }
                    const svgBounds = this.officeInfo[i].bounds;
                    // window.console.log(currSvgBounds);
                    // window.console.log(svgBounds.x1);
                    if (currSvgBounds.x1 === svgBounds.x1 && currSvgBounds.y1 === svgBounds.y1) {
                        window.console.log('1');
                        isValidPosition = false;
                    } else if (
                        between(currSvgBounds.x1, svgBounds.x1, svgBounds.x2) &&
                        between(currSvgBounds.y1, svgBounds.y1, svgBounds.y2)
                    ) {
                        window.console.log('2');
                        isValidPosition = false;
                    } else if (
                        between(currSvgBounds.x1 + svgInfo.width, svgBounds.x1, svgBounds.x2) &&
                        between(currSvgBounds.y1, svgBounds.y1, svgBounds.y2
                        )
                    ) {
                        window.console.log('3');
                        isValidPosition = false;
                    } else if (
                        between(currSvgBounds.x1 + svgInfo.width, svgBounds.x1, svgBounds.x2) &&
                        between(currSvgBounds.y1 + svgInfo.height, svgBounds.y1, svgBounds.y2
                        )
                    ) {
                        window.console.log('4');
                        isValidPosition = false;
                    } else if (
                        between(currSvgBounds.x1, svgBounds.x1, svgBounds.x2) &&
                        between(currSvgBounds.y1 + svgInfo.height, svgBounds.y1, svgBounds.y2
                        )
                    ) {
                        window.console.log('5');
                        isValidPosition = false;
                    } else if (
                        currSvgBounds.y1 === svgBounds.y1 && currSvgBounds.y2 === svgBounds.y2 &&
                        between(currSvgBounds.x1, svgBounds.x1, svgBounds.x2)
                    ) {
                        isValidPosition = false;
                    } else if (
                        currSvgBounds.x1 === svgBounds.x1 && currSvgBounds.x2 === svgBounds.x2 &&
                        between(currSvgBounds.y1, svgBounds.y1, svgBounds.y2)
                    ) {
                        isValidPosition = false;
                    }
                    if (!isValidPosition)
                        break;
                }
                window.console.warn('IsValidPosition', isValidPosition);
                window.console.warn(this.officeInfo[svgIndex].bounds);
                window.console.log('----------');
                if (isValidPosition) {
                    svgInfo.bounds = currSvgBounds;
                } else {
                    this.setElementPosition(this.movable.currentElement, svgInfo.bounds.x1, svgInfo.bounds.y1);
                }
                window.console.warn(currSvgBounds);
                window.console.warn(this.officeInfo[svgIndex].bounds);

                this.movable.currentElement = null;
            },
            setElementPosition(element, x, y) {
                x = Math.floor(x);
                y = Math.floor(y);
                // window.console.log(y);
                if (x <= this.movable.boundary.left) {
                    x = 0;
                }
                if (y <= this.movable.boundary.top) {
                    y = 0;
                }
                if (x > this.movable.boundary.tright) {
                    x = this.movable.boundary.tright;
                }
                if (y > this.movable.boundary.tbottom) {
                    y = this.movable.boundary.tbottom;
                }
                element.style.left = x;
                element.style.top = y;
            },
            // eslint-disable-next-line no-unused-vars
            rotateElement(evt) {
                if (!this.isOfficeEditable) {
                    return;
                }
                const directions = ["north", "east", "south", "west"];
                const svg = this.movable.currentElement;
                let currentDirectionIndex = 0;
                for (let direction of directions) {
                    if (svg.classList.contains(direction)) {
                        break;
                    }
                    currentDirectionIndex++;
                }
                let nextDirection = directions[(currentDirectionIndex + 1) % 4];
                window.console.log('-----------------');
                window.console.log(currentDirectionIndex, nextDirection);
                svg.classList.remove(directions[currentDirectionIndex]);
                svg.classList.add(nextDirection);

                const svgId = svg.dataset.index;
                this.officeInfo[svgId].direction = nextDirection;
            }
        },
    };
</script>