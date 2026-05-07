class APIUtils{
    constructor(apiContext,loginPayload)
    {
        this.apiContext=apiContext
        this.loginPayload=loginPayload
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPayload
            }
        )
        const loginJson = await loginResponse.json()
        const token = loginJson.token
        return token
    }

    async createOrder(orderPayload)
    {
        let response={}
        response.token=await this.getToken()
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayload,
            headers:{
                'Authorization':response.token,
                'content-type':'application/json'
            }
        })
        const orderJson = await orderResponse.json()
        const orderID = orderJson.orders[0]
        response.orderID = orderID
        return response
    }
}

module.exports={APIUtils}