export type DataItem = {
    id: string;
    title: string;
};

const generateDataMock = (numItems: number): DataItem[] => {
    return Array.from({ length: numItems }, (_, index) => ({
        id: (index + 1).toString(),
        title: `Item ${index + 1}`,
    }));
};

export const dataMock = generateDataMock(40);
