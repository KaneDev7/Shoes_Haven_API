
import * as path from 'path'
import { existsSync, unlink } from 'fs';

export const deleteFiles = async (fileNames: string[]): Promise<void> => {
    const dir = path.join(__dirname, '..', '..', 'client/public/uploads/')

    for (const fileName of fileNames) {
        if (existsSync(dir + fileName)) {
            unlink(dir + fileName, (err) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(`file ${fileName} successfully deleted`)
            })
        } else {
            console.log('file not fond')
        }
    }
}