import {createStore} from 'vuex'
import apartmentService from "@/services/apartmentService";
import profileService from "@/services/profileService";
import WPLabels from "@/services/wpLabelsService";


export default createStore({
    state: {
        step: 1,
        reqBody: {
            userAuth: "",
            isPhone: true,
            ending: "XuYLVwPNRg9"
        },
        wpLabels: '',
        showLoader: false,
        userToken: null,
        userContract: [],
        apartmentsList: [],
        apartmentPayments: '',
        apartmentPaidPayments: '',
        apartmentFuturePayments: '',
        paymentsPercent: '',
        totalPaidPayments: '',
        guaranteesList: [],
        contractDetails: '',
        briefContract: '',
        apartmentDetails: '',
        apartmentStoreRoom: '',
        apartmentParking: '',
        tenantChanges: [],
        tenantNotChosenMaterials: [],
        residentChanges: [],
        profileInfo: '',
        profileContacts: [],
        profileAddress: '',
        profileBillingAddress: '',
    },
    getters: {
        getStep(state) {
            return state.step
        },
        getReqBody(state) {
            return state.reqBody
        },
        getWpLabels(state) {
            return state.wpLabels
        },
        getUserToken(state) {
          return state.userToken
        },
        getUserContract(state) {
          return state.userContract
        },
        getApartmentsList(state) {
            return state.apartmentsList
        },
        getFilteredApartmentsList(state) {
            const contract = localStorage.getItem('contractIdStorage');
            return state.apartmentsList.filter(item => item.contractId !== contract)
        },
        getLoader(state) {
            return state.showLoader
        },
        getApartmentPayments(state) {
            return state.apartmentPayments;
        },
        getApartmentPaidPayments(state) {
            return state.apartmentPaidPayments;
        },
        getTotalPaidPayments(state) {
            return state.totalPaidPayments;
        },
        getPaymentsPercent(state) {
            return state.paymentsPercent;
        },
        getFuturePayments(state) {
            return state.apartmentFuturePayments;
        },
        getGuarantees(state) {
            return state.guaranteesList;
        },
        getContractDetails(state) {
            return state.contractDetails;
        },
        getBriefContract(state) {
            return state.briefContract;
        },
        getApartmentDetails(state) {
            return state.apartmentDetails;
        },
        getApartmentStoreRoom(state) {
            return state.apartmentStoreRoom;
        },
        getApartmentParking(state) {
            return state.apartmentParking;
        },
        getTenantChanges(state) {
            return state.tenantChanges;
        },
        getTenantNotChosenMaterials(state) {
            return state.tenantNotChosenMaterials;
        },
        getResidentChanges(state) {
            return state.residentChanges;
        },
        getProfileInfo(state) {
            return state.profileInfo;
        },
        getProfileContacts(state) {
            return state.profileContacts;
        },
        getProfileAddress(state) {
            return state.profileAddress;
        },
        getProfileBillingAddress(state) {
            return state.profileBillingAddress;
        },
    },
    mutations: {
        nextStep(state) {
            state.step++;
        },
        prevStep(state) {
            state.step--;
        },
        changeStep(state, payload) {
            state.step = payload;
        },
        setWpLabels(state, payload) {
            state.wpLabels = payload
        },
        switchLoader(state, payload) {
            state.showLoader = payload
        },
        reqBodyLogin(state, payload) {
            state.reqBody = payload
        },
        setUserToken(state, payload) {
            state.userToken = payload
            localStorage.setItem('userToken', payload);
        },
        setApartmentsList(state, payload) {
            state.apartmentsList = payload
        },
        setUserContract(state, payload) {
            state.userContract = payload
        },
        setPaymentsPercent(state, payload) {
            state.paymentsPercent = payload
        },
        apartmentPayments(state, payload) {
            state.apartmentPayments = payload
        },
        apartmentPaidPayments(state, payload) {
            state.apartmentPaidPayments = payload
        },
        setApartmentFuturePayments(state, payload) {
            state.apartmentFuturePayments = payload
        },
        setTotalPaidPayments(state, payload) {
            state.totalPaidPayments = payload
        },
        setGuarantees(state, payload) {
            state.guaranteesList = payload
        },
        setContractDetails(state, payload) {
            state.contractDetails = payload
        },
        setBriefContract(state, payload) {
            state.briefContract = payload
        },
        setApartmentDetails(state, payload) {
            state.apartmentDetails = payload
        },
        setApartmentStoreRoom(state, payload) {
            state.apartmentStoreRoom = payload
        },
        setApartmentParking(state, payload) {
            state.apartmentParking = payload
        },
        setTenantChanges(state, payload) {
            state.tenantChanges = payload
        },
        setTenantNotChosenMaterials(state, payload) {
            state.tenantNotChosenMaterials = payload
        },
        setResidentChanges(state, payload) {
            state.residentChanges = payload
        },
        setProfileInfo(state, payload) {
            state.profileInfo = payload
        },
        setProfileContacts(state, payload) {
            state.profileContacts = payload
        },
        setProfileAddress(state, payload) {
            state.profileAddress = payload
        },
        setProfileBillingAddress(state, payload) {
            state.profileBillingAddress = payload
        },
    },
    actions: {
        async wpLabels({commit}) {
            const labels = await WPLabels.fetchWPLabels()
            const labelsData = JSON.parse(labels.data.data.post_content)

            let lablesObj = [];
            labelsData.forEach(item => {
                lablesObj.push([item[0], item[1]])
            })
            const formated = Object.fromEntries(lablesObj)
            console.log(formated);

            commit('setWpLabels', formated);
        },
        async userContract({commit}, param) {
            const singContract = await apartmentService.signInContract(param)

            await commit('setUserToken', singContract.data.info.token);
            commit('setUserContract', singContract.data.info);
        },
        async apartmentPayments({commit}, token) {
            const apartmentPayments = await apartmentService.fetchApartmentPayments(token)
            const payments = apartmentPayments.data
            commit('apartmentPayments', payments);
            commit('setPaymentsPercent', (payments.totalPrice - payments.amountLeftToPay) / payments.totalPrice * 100);
        },
        async apartmentPaidPayments({commit}, token) {
            const apartmentPaidPayments = await apartmentService.fetchPaidPayments(token)
            commit('apartmentPaidPayments', apartmentPaidPayments.data.paymentsList);
            commit('setTotalPaidPayments', apartmentPaidPayments.data.totalPayment);
        },
        async apartmentFuturePayments({commit}, token) {
            const apartmentPaidPayments = await apartmentService.fetchFuturePaidPayments(token)
            commit('setApartmentFuturePayments', apartmentPaidPayments.data.futurePaymentsList);
        },
        async guarantees({commit}, token) {
            const guarantees = await apartmentService.fetchGuarantees(token)
            commit('setGuarantees', guarantees.data.guaranteesList);
        },
        async contractDetails({commit}, token) {
            const contract = await apartmentService.fetchContractDetails(token)
            commit('setContractDetails', contract.data);
            commit('setBriefContract', contract.data.purchaseOverview);
            commit('setApartmentDetails', contract.data.apartment);
            commit('setApartmentStoreRoom', contract.data.storeRoom);
            commit('setApartmentParking', contract.data.parking);
        },
        async tenantChanges({commit}, token) {
            const tenantChanges = await apartmentService.fetchTenantChanges(token)
            commit('setTenantChanges', tenantChanges.data.ChosenMaterials);
            commit('setTenantNotChosenMaterials', tenantChanges.data.notChosenMaterials);
            commit('setResidentChanges', tenantChanges.data.changes);
        },
        async profileData({commit}, token) {
            const data = await profileService.fetchProfileDetails(token)
            commit('setProfileInfo', data.data.personalInfo);
            commit('setProfileContacts', data.data.contactList);
            commit('setProfileAddress', data.data.addressData);
            commit('setProfileBillingAddress', data.data.billing);
        },
    },
    modules: {}
})
