import { whenDOMisLoaded } from './promises.js'
import { ERRORS, ErrorHandler } from './errors.js'

/**
 * Sorting constants.
 *
 * @param {objects}
 */
const ASC = 'asc'
const DESC = 'desc'

/**
 * Rearranges the z-index values of the elements indicated.
 */
export class zSorter {
    /**
     * Initializes the library sort mechanism.
     *
     * @param {object} config
     */
    static async init(config) {
        try {
            this.parseConfig(config)
            await whenDOMisLoaded.then(this.traverseDOM())
            this.getNodesInfo()
            this.sortNodes()
        } catch (e) {
            ErrorHandler.handle(e)
        }
    }

    /**
     * Parses the configuration object and sets the class attributes.
     *
     * @param {object} configObject
     */
    static parseConfig(configObject) {
        if (configObject === undefined) {
            throw new Error(ERRORS.undefined.configObject)
        }

        if (configObject.hasOwnProperty('order')) {
            this.order = configObject.order
        } else {
            throw new Error(ERRORS.undefined.order)
        }

        if (configObject.hasOwnProperty('sorting')) {
            this.sorting = configObject.sorting
        } else {
            this.sorting = ASC
        }
    }

    /**
     * Finds and collects the nodes that will be rearranged.
     */
    static traverseDOM() {
        let nodes = []

        this.order.forEach(node => {
            let nodeList = document.querySelectorAll(node)
            nodeList.forEach(node => {
                nodes.push(node)
            })
        })

        this.nodes = nodes
    }

    /**
     * Collects the z-index value of the nodes that will be rearranged.
     */
    static getNodesInfo() {
        let zIndex = []

        this.nodes.forEach(node => {
            let nodeStyle = window.getComputedStyle(node)
            let nodeZIndex = nodeStyle.getPropertyValue('z-index')
            zIndex.push(parseInt(nodeZIndex))
        })

        this.zIndex = zIndex
    }

    /**
     * Sorts the nodes z-index values and reassigns them.
     */
    static sortNodes() {
        if (this.sorting === ASC) {
            this.zIndex = this.zIndex.sort((a, b) => a - b)
        } else {
            this.zIndex = this.zIndex.sort((a, b) => b - a)
        }

        this.nodes.forEach(node => {
            node.style.zIndex = this.zIndex[0]
            this.zIndex.shift()
        })
    }
}
