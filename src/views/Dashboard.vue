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
            <v-btn class="orange white--text v-btn--block" @click="refreshOffice">Refresh office
            </v-btn>
            <hr />
            <v-btn v-if="isUserManager" class="blue white--text v-btn--block" @click="makeOfficeEditable">{{ btnEditText
                }}
            </v-btn>
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
                                @click="changeMode(mode)"
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
                    @mousedown="handleMouseDown($event, true)"

            >
                <template v-for="({style, cssClass, index, id}) in officeInfo">
                    <div
                            v-bind:key="style"
                            @mousedown="handleMouseDown($event, false)"
                            @mouseup="handleMouseUp"
                    >
                        <Desk v-bind:style="style" :class="cssClass"
                              v-bind:data-index="index"
                              v-bind:data-id="id"
                              v-on:click.native="showDetails(id)"
                        />
                    </div>
                </template>
                <template v-for="wall in rooms.walls">
                    <div class="wall" v-bind:key="wall.index" v-bind:style="wall.cssStyle">
                    </div>
                </template>
                <template v-for="door in rooms.doors">
                    <div class="door" v-bind:key="door.index" v-bind:style="door.cssStyle">
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
        <v-dialog
                v-model="movable.insertElem.showDialog"
                max-width="750"
        >
            <v-card>
                <v-card-title class="headline">Assign person to workspace</v-card-title>
                <v-text-field
                        v-model="movable.insertElem.search"
                        append-icon="mdi-account-search"
                        label="Search"
                        single-line
                        hide-details
                        style="padding: 5px;"
                />
                <v-data-table
                        v-model="movable.insertElem.selectedUser"
                        :headers="movable.insertElem.headers"
                        :items="movable.insertElem.availableUsers"
                        single-select
                        item-key="username"
                        :loading="movable.insertElem.loadingData"
                        loading-text="Loading users... Please wait"
                        show-select
                        :search="movable.insertElem.search"
                        class="elevation-1"
                >
                </v-data-table>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            class="blue white--text"
                            text
                            @click="assignUserToWorkspace"
                    >
                        Assign
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                    },
                    {
                        'title': 'Add',
                        'icon': 'mdi-plus',
                        'mode': 'add',
                        'subtitle': 'Add new workspace'
                    }
                ],
                isUserManager: true,
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
                    insertElem: {
                        coords: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        },
                        showDialog: false,
                        loadingData: false,
                        search: '',
                        selectedUser: [],
                        availableUsers: [],
                        headers: [
                            {text: "Username", value: 'username'},
                            {text: "Name", value: 'name'},
                            {text: "Surname", value: 'surname'},
                            {text: "Email", value: 'email'},
                            {text: "Country", value: 'country'},
                        ]

                    },
                    elementWidth: 100,
                    elementHeight: 100,
                    removeElementDialog: false,
                    mode: null,
                    currentElement: null,
                    offsetLeft: 0,
                    offsetTop: 0,
                    boundary: {
                        left: 0,
                        right: 1000,
                        top: 0,
                        bottom: 1000,
                    }
                },
                rooms: {
                    doorWidth: 100,
                    wallWidth: 15,
                    walls: [],
                    doors: [],
                    // some other properties
                }

            };
        },
        components: {
            Drawer, Desk
        },
        created() {
            this.isUserManager = this.$store.state.userDetails.role.name === 'MANAGER';
            this.renderOffice();
        },
        methods: {
            refreshOffice() {
                this.officeInfo = [];
                this.detailData = [];
                this.rooms.walls = [];
                this.rooms.doors = [];
                this.renderOffice();
            },
            renderOffice: async function () {
                this.loading = false;
                const officeResponse = await this.axios.get(this.$store.getters.officeRoute);
                officeResponse.data.forEach((v, i) => {
                    this.addElemToOfficeInfo(v, i);
                });
                const roomResponse = await this.axios.get(this.$store.getters.getRooms);
                const dataWalls = [];
                // const ifPosIsZero = (p) => p===0 || p===1000?p:p+10;
                const wallWidth = this.rooms.wallWidth;
                roomResponse.data.forEach((v, i) => {
                    let x1 = v.x1Position;
                    let x2 = v.x2Position;
                    let y1 = v.y1Position;
                    let y2 = v.y2Position;

                    if (x1 === 0) {
                        x1 -= wallWidth;
                    }
                    if (y1 === 0) {
                        y1 -= wallWidth;
                    }

                    const width = x2 - x1;
                    const height = y2 - y1;

                    const w1 = {
                        index: i * 4,
                        x1: x1,
                        y1: y1,
                        x2: x1 + width,
                        y2: y1 + wallWidth,
                    };
                    w1.cssStyle = `top: ${w1.y1}px; left:${w1.x1}px; width: ${width}px; height: ${wallWidth}px;`;

                    const w2 = {
                        index: i * 4 + 1,
                        x1: x1 + width,
                        y1: y1,
                        x2: x1 + width + wallWidth,
                        y2: y1 + height,
                    };
                    w2.cssStyle = `top: ${w2.y1}px; left:${w2.x1}px; width: ${wallWidth}px; height: ${height}px;`;

                    const w3 = {
                        index: i * 4 + 2,
                        x1: x1,
                        y1: y1 + height,
                        x2: x1 + width,
                        y2: y1 + height + wallWidth,
                    };
                    w3.cssStyle = `top: ${w3.y1}px; left:${w3.x1}px; width: ${width}px; height: ${wallWidth}px;`;

                    const w4 = {
                        index: i * 4 + 3,
                        x1: x1,
                        y1: y1,
                        x2: x1 + wallWidth,
                        y2: y1 + height,
                    };
                    w4.cssStyle = `top: ${w4.y1}px; left:${w4.x1}px; width: ${wallWidth}px; height: ${height}px;`;
                    dataWalls.push(w1);
                    dataWalls.push(w2);
                    dataWalls.push(w3);
                    dataWalls.push(w4);
                });
                this.rooms.walls = dataWalls;

                const dataDoors = [];
                const doorResponse = await this.axios.get(this.$store.getters.getDoors);

                doorResponse.data.forEach((v, i) => {
                    const d = {};
                    d.index = 100 * (i + 1);
                    d.cssStyle = `top: ${v.y1Position}px; left: ${v.x1Position}px;`;
                    if (v.rotation === 'WEST' || v.rotation === 'EAST') {
                        d.cssStyle += `width: ${wallWidth}px; height: ${this.rooms.doorWidth}px;`;
                    } else {
                        d.cssStyle += `height: ${wallWidth}px; width: ${this.rooms.doorWidth}px;`;
                    }

                    dataDoors.push(d);
                });
                this.rooms.doors = dataDoors;

                this.loading = false;
            },
            addElemToOfficeInfo(v, i) {
                const pieceOfInfo = {};
                pieceOfInfo.response = v;
                pieceOfInfo.index = i;
                pieceOfInfo.id = v.id;
                pieceOfInfo.name = v.name;
                pieceOfInfo.userId = v.user.id;
                const rotation = v.rotation || 'NORTH';
                if (v.user.id === this.$store.state.userDetails.id) {
                    pieceOfInfo.cssClass = "svg-workspace " + rotation.toLowerCase() + " " + v.user.status.toLowerCase() + " current";
                } else {
                    pieceOfInfo.cssClass = "svg-workspace " + rotation.toLowerCase() + " " + v.user.status.toLowerCase();
                }
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
                        value: v.user.username
                    },
                    {
                        key: 'email',
                        value: v.user.email
                    },
                    {
                        key: 'status',
                        value: v.user.status
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

                this.officeInfo.push(pieceOfInfo);
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
            },
            changeMode(mode) {
                this.movable.mode = mode;
                this.movable.currentElement = null;
            },
            async makeOfficeEditable() {
                if (this.isOfficeEditable) {
                    this.loading = true;
                    this.btnEditText = 'Edit office';
                    this.movable.mode = null;
                    this.isOfficeEditable = false;
                    this.$refs.officeCanvas.classList.remove('editable-office');

                    // const tempData = [];
                    // await this.axios.delete(this.$store.getters.updateWorkstation(el.id));
                    try {
                        for (let el of this.officeInfo) {
                            const data = el.response;
                            data['x1Position'] = el.bounds.x1;
                            data['y1Position'] = el.bounds.y1;
                            data['x2Position'] = el.bounds.x2;
                            data['y2Position'] = el.bounds.y2;
                            data['rotation'] = el.direction.toUpperCase();
                            // window.console.log(data);
                            await this.axios.put(this.$store.getters.updateWorkstation(el.id), data);
                            // tempData.push({
                            //     // "id": data.id,
                            //     "name": data.name,
                            //     "rotation": data.rotation,
                            //     "x1Position": data.x1Position,
                            //     "y1Position": data.y1Position,
                            //     "x2Position": data.x2Position,
                            //     "y2Position": data.y2Position,
                            //     "user": {
                            //         "id": data.user.id
                            //     },
                            //     "office": {
                            //         "id": this.$store.state.officeData.id
                            //     }
                            // });
                        }
                        // window.console.warn(tempData);
                        // window.console.warn(JSON.stringify(tempData));

                        this.showSnackbar('Office updated successfully', 'success', 'green');
                    } catch (e) {
                        this.showSnackbar('Error occurred while updating the office', 'error', 'red');
                        window.console.error(e);
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
                const id = el.dataset.id;
                try {
                    await this.axios.delete(this.$store.getters.updateWorkstation(id));
                    this.showSnackbar('Element removed successfully', 'success', 'green');
                    const svgIndex = Number.parseInt(this.movable.currentElement.dataset.index);
                    this.officeInfo.splice(svgIndex, 1);
                } catch (e) {
                    this.showSnackbar('Error occurred while removing element', 'error', 'red');
                }
            },
            handleMouseDown(evt, isMainContainer) {
                if (!this.isOfficeEditable) return;
                if (this.movable.mode == null) return;
                const currentElement = this.getSvgElementFromEvent(evt);

                this.movable.currentElement = currentElement;

                if (this.movable.mode === 'movable' && currentElement) {
                    this.modeMovable(evt);
                } else if (this.movable.mode === 'rotate' && currentElement && !isMainContainer) {
                    this.rotateElement(evt);
                } else if (this.movable.mode === 'remove' && currentElement && !isMainContainer) {
                    this.movable.removeElementDialog = true;
                } else if (this.movable.mode === 'add' && isMainContainer) {
                    this.insertElement(evt);
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
            },
            // eslint-disable-next-line no-unused-vars
            handleMouseMove(evt) {
                if (!this.isOfficeEditable) return;
                if (this.movable.mode !== 'movable') return;
                if (!this.movable.currentElement) return;

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
                this.movable.currentElement.classList.remove('dragged');
                const svgIndex = Number.parseInt(this.movable.currentElement.dataset.index);
                const svgInfo = this.officeInfo[svgIndex];
                // validate position
                const currentX = getValOfProperty(this.movable.currentElement.style.left);
                const currentY = getValOfProperty(this.movable.currentElement.style.top);
                const workspaceBounds = {
                    x1: currentX,
                    y1: currentY,
                    x2: currentX + svgInfo.width,
                    y2: currentY + svgInfo.height,
                };

                let isValidPosition = true;
                for (let i = 0; i < this.officeInfo.length; i++) {
                    if (i === svgIndex) {
                        continue;
                    }
                    const bounds1 = this.officeInfo[i].bounds;
                    isValidPosition = this.validatePosition(bounds1, workspaceBounds);

                    if (!isValidPosition)
                        break;
                }
                if (isValidPosition) { // check walls
                    for (let i = 0; i < this.rooms.walls.length; i++) {
                        const bounds1 = this.rooms.walls[i];
                        isValidPosition = this.validatePosition(bounds1, workspaceBounds);
                        if (!isValidPosition)
                            break;
                    }
                }


                if (isValidPosition) {
                    svgInfo.bounds = workspaceBounds;
                } else {
                    this.setElementPosition(this.movable.currentElement, svgInfo.bounds.x1, svgInfo.bounds.y1);
                }

                this.movable.currentElement = null;
            },
            setElementPosition(element, x, y) {
                x = Math.floor(x);
                y = Math.floor(y);
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
                svg.classList.remove(directions[currentDirectionIndex]);
                svg.classList.add(nextDirection);

                const svgId = svg.dataset.index;
                this.officeInfo[svgId].direction = nextDirection;
            },
            assignUserToWorkspace() {
                if (this.movable.insertElem.selectedUser.length === 0) {
                    this.showSnackbar("Invalid user.", "error", "red");
                    return;
                }
                window.console.log(this.movable.insertElem.selectedUser);
                this.movable.insertElem.showDialog = false;
                const selectedUser = this.movable.insertElem.selectedUser[0];
                const coords = this.movable.insertElem.coords;
                this.movable.insertElem.selectedUser = [];
                const data = {
                    name: selectedUser.name + "'s desk",
                    user: selectedUser,
                    office: {
                        id: this.$store.state.officeData.id
                    },
                    "rotation": "NORTH",
                    "x1Position": coords.x1,
                    "y1Position": coords.y1,
                    "x2Position": coords.x2,
                    "y2Position": coords.y2,
                };
                this.axios.post(this.$store.getters.insertWorkstation, data).then(response => {
                    window.console.log('asdfasdfasdfasd');
                    if (response.status > 300) {
                        throw new Error("Invalid data" + response.status);
                    }
                    this.addElemToOfficeInfo(data, this.officeInfo.length);
                    this.showSnackbar("Workspace added successfully.", "success", "green");
                }).catch(err => window.console.error(err));


            },
            // eslint-disable-next-line no-unused-vars
            insertElement(evt) {
                const currX = evt.offsetX;
                const currY = evt.offsetY;

                const bounds2 = {
                    x1: currX,
                    y1: currY,
                    x2: currX + this.movable.elementWidth,
                    y2: currY + this.movable.elementHeight,
                };
                let isValidPosition = true;
                for (let elem of this.officeInfo) {
                    const bounds1 = elem.bounds;
                    isValidPosition = this.validatePosition(bounds1, bounds2);
                    if (!isValidPosition) {
                        this.showSnackbar("Invalid position of workspace", "error", "red");
                        break;
                    }
                }
                if (isValidPosition) {
                    this.movable.insertElem.coords = bounds2;
                    this.movable.insertElem.loadingData = true;
                    this.movable.insertElem.showDialog = true;
                    this.axios.get(this.$store.getters.availableUser).then(response => {
                        this.movable.insertElem.availableUsers = response.data;
                        this.movable.insertElem.loadingData = false;
                    }).catch(err => window.console.error(err));
                }
            },
            validatePosition(bounds1, sbounds2) {
                let isValidPosition = true;
                const between = (p, p1, p2) => p > p1 && p < p2;

                if (
                    between(bounds1.x1, sbounds2.x1, sbounds2.x2) &&
                    between(sbounds2.y1, bounds1.y1, bounds1.y2)
                ) {
                    isValidPosition = false;
                } else if (
                    between(bounds1.y1, sbounds2.y1, sbounds2.y2) &&
                    between(sbounds2.x1, bounds1.x1, bounds1.x2)
                ) {
                    isValidPosition = false;
                } else if (
                    between(bounds1.y1, sbounds2.y1, sbounds2.y2) &&
                    between(bounds1.x1, sbounds2.x1, sbounds2.x2)
                ) {
                    isValidPosition = false;
                } else if (sbounds2.x1 === bounds1.x1 && sbounds2.y1 === bounds1.y1) {
                    isValidPosition = false;
                } else if (
                    between(sbounds2.x1, bounds1.x1, bounds1.x2) &&
                    between(sbounds2.y1, bounds1.y1, bounds1.y2)
                ) {
                    isValidPosition = false;
                } else if (
                    between(sbounds2.x2, bounds1.x1, bounds1.x2) &&
                    between(sbounds2.y1, bounds1.y1, bounds1.y2
                    )
                ) {
                    isValidPosition = false;
                } else if (
                    between(sbounds2.x2, bounds1.x1, bounds1.x2) &&
                    between(sbounds2.y2, bounds1.y1, bounds1.y2
                    )
                ) {
                    isValidPosition = false;
                } else if (
                    between(sbounds2.x1, bounds1.x1, bounds1.x2) &&
                    between(sbounds2.y2, bounds1.y1, bounds1.y2
                    )
                ) {
                    isValidPosition = false;
                } else if (
                    sbounds2.y1 === bounds1.y1 && sbounds2.y2 === bounds1.y2 &&
                    (between(sbounds2.x1, bounds1.x1, bounds1.x2) || between(sbounds2.x2, bounds1.x1, bounds1.x2))
                ) {
                    isValidPosition = false;
                } else if (
                    sbounds2.x1 === bounds1.x1 && sbounds2.x2 === bounds1.x2 &&
                    (between(sbounds2.y1, bounds1.y1, bounds1.y2) || between(sbounds2.y2, bounds1.y1, bounds1.y2))
                ) {
                    isValidPosition = false;
                } else if (
                    sbounds2.x1 < this.movable.boundary.left ||
                    sbounds2.x2 > this.movable.boundary.right ||
                    sbounds2.y1 < this.movable.boundary.top ||
                    sbounds2.y1 > this.movable.boundary.bottom
                ) {
                    isValidPosition = false;
                }

                return isValidPosition;
            }
        },
    };
</script>