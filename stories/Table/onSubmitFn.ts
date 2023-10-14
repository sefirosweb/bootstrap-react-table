import { ActionCrud, TableRef } from "../../src"
import { GeneratedData, createData, deleteData, updateData } from "../../test/mock"

export const onSubmitFn = (data: Partial<GeneratedData>, action: ActionCrud, tableRef: TableRef | null): Promise<Partial<any> | null> => {
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
            .then(() => {
                tableRef?.setShowModal(false)
                tableRef?.refreshTable()
                resolve(null)
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
                tableRef?.setIsLoadingModal(false)
            })

    })
}
