import { faker } from '@faker-js/faker';
import { generateRandomString } from "./generateRandomString"
import { getRandom } from "./getRandom"
import { OptionsType, generateOptionsValue } from './generateOptionsValue';

export type GeneratedData = {
    uuid: string;
    value: string;
    ean: number;
    name: string;
    description: string | null;
    random: string | null;
    price: number;
    category: OptionsType;
    categories: Array<OptionsType>;
    created_at: string;
}

const generatedData: Array<GeneratedData> = []
type Options = {
    minValue?: number;
    maxValue?: number;
}

export const getData = (options?: Options) => {
    const { maxValue = 300, minValue = 40 } = options ?? {}

    if (generatedData.length > 0) {
        generatedData.sort((a, b) => (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime())
        return generatedData
    }

    console.log('Generating mok data.. "generateData"')
    const random = Math.floor(Math.random() * maxValue) + minValue
    const data: Array<GeneratedData> = []
    for (var i = 0; i < random; i++) {

        const category = getRandom(generateOptionsValue())

        const uuid = faker.string.uuid()
        data.push({
            uuid: uuid,
            value: uuid,
            ean: faker.number.int({ min: 8437002848521, max: 9000000000000 }),
            name: faker.commerce.product(),
            description: Math.random() < 0.4 ? faker.commerce.productDescription() : null,
            random: Math.random() < 0.4 ? generateRandomString(10) : null,
            price: parseFloat(faker.commerce.price()) + 0.99,
            category: category,
            created_at: faker.date.recent({ days: 10 }).toISOString(),
            categories: [
                getRandom(generateOptionsValue()),
                getRandom(generateOptionsValue()),
                getRandom(generateOptionsValue()),
                getRandom(generateOptionsValue())
            ]
        })
    }

    generatedData.push(...data)
    console.log('data created: ', data)
    return generatedData
}

export const updateData = (data: Partial<GeneratedData>, delay = 150): Promise<Partial<GeneratedData>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const findData = generatedData.find((item) => item.uuid === data.uuid)
            if (!findData) return
            Object.assign(findData, data)
            resolve(data)
        }, delay)
    })
}
export const createData = (data: GeneratedData, delay = 150): Promise<GeneratedData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const uuid = faker.string.uuid()
            data.uuid = uuid
            data.value = uuid
            generatedData.push(data)
            resolve(data)
        }, delay)
    })
}

export const deleteData = (uuid: string, delay = 150): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const findData = generatedData.find((item) => item.uuid === uuid)
            if (!findData) return
            const index = generatedData.indexOf(findData)
            generatedData.splice(index, 1)
            resolve(uuid)
        }, delay);
    })
}