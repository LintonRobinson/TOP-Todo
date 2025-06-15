// export 

export default class Element {
    constructor(elementTag) {
        this.tag = elementTag;
        this.attributes = {};
        this.children = [];
        this.innerText = undefined;
    }

    setElementAttribute(attributes) {
        for (const key of Object.keys(attributes)) {
            this.attributes[key] = attributes[key];
        }
        return this
    }

    removeElementAttributes() {
        this.attributes = {}
    }


    addInnerText(innerText) {
        this.children = [];
        this.innerText = innerText;
        return this
    }


    addChildElement(childElement) {
        this.innerText = undefined;
        if (!Array.isArray(childElement)) {
            this.children.push(childElement);
        } else {
            childElement.forEach((child) => {
                this.children.push(child);
            })
        }
        
        return this
    }
    
    build() {
        let createdAndAppendedElement = document.createElement(this.tag)
        // Add attributes
        for (const key of Object.keys(this.attributes)) {
            createdAndAppendedElement.setAttribute(key,this.attributes[key])
        }

        // Add children / inner text

        if (this.innerText === undefined) {
            for (const child of this.children) {
                
                createdAndAppendedElement.appendChild(child.build()) 
            }
        } else {
            const elementText = document.createTextNode(this.innerText)
            createdAndAppendedElement.appendChild(elementText)
        }

        return createdAndAppendedElement
    }
}

// document.querySelector("body").appendChild(new Element("div").setElementAttribute({class: "small-white"}).addInnerText("Ya Mama").build())

// document.querySelector("body").appendChild(UIController.elements.individualTaskWrapper)