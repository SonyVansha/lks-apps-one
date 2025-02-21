export const state = () => ({
    examData: [],
})

export const mutations = {
    STORE_EXAM_DATA(state, data) {
        state.examData = data
    }
}

export const actions = {
    async storeExam({ commit }) {
        try {
            const res = await this.$axios.get('/apiv2/quiz')
            // Pastikan status API sesuai dengan apa yang diharapkan
            if (res.data.code === 200) {
                commit('STORE_EXAM_DATA', res.data.data)
                return res.data.data
            } else {
                // Menangani kode error jika ada
                return { code: res.data.code, error: res.data.status }
            }
        } catch (error) {
            console.error(error)
            return []
        }
    }
}

export const getters = {
    // Akses data examData yang benar
    getData(state) {
        return state.examData
    }
}
