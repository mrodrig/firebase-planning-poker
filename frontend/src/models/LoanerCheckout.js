import Firebase from '@/services/firebase';

export default class LoanerCheckout {
    constructor(params) {
        const keys = ['assetId', 'studentId'];
        if (params?.id) {
            this.id = params.id;
        }

        keys.forEach(k => this[k] = params?.[k]);
    }

    async checkout() {
        return Firebase.firestoreSave('loaner-transactions', this);
    }
}