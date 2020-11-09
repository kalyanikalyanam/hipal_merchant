
export const updateObject = (object, updatedProperties) => {
    return {...object, ...updatedProperties}
}
export const addToarray = (array, object) => {
    let newArray = array
    newArray.push(object)
    return newArray
}