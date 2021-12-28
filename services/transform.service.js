export class TransformService {
    static trsfmDataToArray(fbData) {
        return Object.keys(fbData).map(key => {
            const item = fbData[key]
            item.id = key
            return item
        })
    }
}