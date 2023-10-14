import { ActionCrud, TableRef } from "../../src"
import { GeneratedData, createData, deleteData, getRandom, updateData } from "../../test/mock"

export const onSubmitFnWoRefresh = (data: Partial<GeneratedData>, action: ActionCrud, tableRef: TableRef | null): Promise<Partial<GeneratedData> | null> => {
    console.log('onSubmitFn-data', data)
    console.log('onSubmitFn-action', action)
    return new Promise((resolve, reject) => {
        tableRef?.setIsLoadingModal(true)

        const actionFn = () => {

            if (action === 'create') {
                return createData(data, 230)
            }

            if (action === 'edit') {
                return updateData(data, 230)
            }

            if (action === 'delete') {
                if (!data.uuid) return Promise.reject('uuid is required')
                return deleteData(data.uuid, 230)
            }

            return Promise.reject('Action not found')
        }

        actionFn()
            .then((newData) => {
                tableRef?.setShowModal(false)
                resolve(newData)
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
                tableRef?.setIsLoadingModal(false)
            })

    })
}