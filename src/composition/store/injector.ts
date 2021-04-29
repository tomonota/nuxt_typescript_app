import { inject } from '@nuxtjs/composition-api'
import { AuthUserStore, AuthUserKey } from '~/composition/store/authUserStore'
import { TokenKey, TokenStore } from '~/composition/store/tokenStore'
import { ProductStore, ProductKey } from '~/composition/store/productStore'

export const injectProductStore = () => inject(ProductKey) as ProductStore
export const injectTokenStore = () => inject(TokenKey) as TokenStore
export const injectAuthUserStore = () => inject(AuthUserKey) as AuthUserStore
