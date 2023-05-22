export default class Pad{
    constructor(padEle)
    {
        this.padEle = padEle;
        this.reset();
    }

    // reset function 
    reset()
    {
        this.position=40;
    }

    info()
    {
        return this.padEle.getBoundingClientRect();
    }

    // getter and setter

    set position(value)
    {
        this.padEle.style.setProperty("--position",value);
    }

    get position()
    {
        return parseFloat(getComputedStyle(this.padEle).getPropertyValue("--position"));
    }
}