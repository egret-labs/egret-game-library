class GestureEvent extends egret.Event {
    public static ACHE_GESTURE:string = "acheGesture";

    /**
     *  GestureManager instance that related to this object
     */
    public gm:GestureManager;

    /**
     * gesture state, all types of state is defined in acheGesture.utils.GestureState
     * @see GestureState
     */
    public state:string;

    /**
     * delta x value
     * Pan gesture for example, dx is the delta x value updated every time user's finger moves
     */
    public dx:number;

    /**
     * delta y value
     * Pan gesture for example, dy is the delta y value updated every time user's finger moves
     */
    public dy:number;

    /**
     *
     */
    public localLocation:egret.Point;

    /**
     * delta scale value
     * Pinch gesture use this value
     */
    public dScale:number;

    /**
     *  The rotation of the gesture in radians since its last change.
     */
    public rotation:number;

    /**
     * time interval for some specific gesture
     * Swipe gesture for example, interval is the time interval when swip happen
     */
    public interval:number;

    /**
     * possible state of some specific gesture
     * Tap gesture for example, before touch end, the possible value will come along with this object to indicate that if the tap gesture is possible to recognize
     */
    public possible:boolean;

    /**
     * @param type        Event type, use AcheGestureEvent.ACHE_GESTURE
     * @param gm        GestureManager instance that related to this object
     * @param state        What state of the gesture when this happen, see ache.Gesture.utils.GestureState
     */
    public constructor(type:string, gm:GestureManager, state:string = "") {
        super(type, false, null);
        this.gm = gm;
        this.state = state;
    }
}
