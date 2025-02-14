export const state = () => ({
    majorsData: [],
})

export const mutations = {
    STORE_MAJOR_DATA(state, data) {
        state.majorsData = Array.isArray(data) ? data : []  // Pastikan data adalah array
    }
}

export const actions = {
    async storeMajors({ commit }) {
        try {
            // Mengambil data dari API
            const res = await this.$axios.get('/api/majors')

            // Memeriksa apakah respons API berhasil dan data sesuai
            if (res && res.data && res.data.code === 200) {
                const majors = res.data.data;
                if (Array.isArray(majors)) {
                    commit('STORE_MAJOR_DATA', majors)  // Menyimpan data jika array
                    return majors  // Mengembalikan array data yang berhasil diambil
                } else {
                    commit('STORE_MAJOR_DATA', [])
                    return []  // Mengembalikan array kosong jika data tidak sesuai
                }
            } else {
                // Mengembalikan array kosong jika status tidak 200
                commit('STORE_MAJOR_DATA', [])
                return []  // Mengembalikan array kosong jika respons error
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data:", error)
            commit('STORE_MAJOR_DATA', [])  // Mengatur data kosong jika terjadi kesalahan
            return []  // Mengembalikan array kosong pada kesalahan
        }
    }
}

export const getters = {
    getData(state) {
        return state.majorsData
    }
}
