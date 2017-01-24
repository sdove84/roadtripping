/**
 * Created by Patrick on 1/17/2017.
 */

// trend = result.current_observation.pressure_trend
    if (trend === "+") {
        return(arrow up)
    } else if (trend === "-") {
        return(arrow down)
    } else {
        return("steady")
    }