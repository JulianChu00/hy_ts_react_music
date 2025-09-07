import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type { HYRequestConfig } from './type'

class HYRequest {
  instance: AxiosInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // ========= 全局实例拦截器 ==========
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers ?? {}
        return config
      },
      (err) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
      (err) => Promise.reject(err)
    )

    // ========= 针对 HYRequest 实例的拦截器 ==========
    if (config.interceptors) {
      const {
        requestSuccessFn,
        requestFailureFn,
        responseSuccessFn,
        responseFailureFn
      } = config.interceptors

      // 类型兼容包装
      if (requestSuccessFn || requestFailureFn) {
        this.instance.interceptors.request.use(
          (cfg: InternalAxiosRequestConfig) => {
            cfg.headers = cfg.headers ?? {}
            // 调用你传入的函数，保证返回值是 InternalAxiosRequestConfig
            if (requestSuccessFn) {
              const newCfg = requestSuccessFn(cfg as any) // 把类型先断言成 any
              return { ...cfg, ...newCfg } as InternalAxiosRequestConfig
            }
            return cfg
          },
          requestFailureFn
        )
      }

      if (responseSuccessFn || responseFailureFn) {
        this.instance.interceptors.response.use(
          responseSuccessFn,
          responseFailureFn
        )
      }
    }
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    // 单次请求拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config
      ) as HYRequestConfig<T>
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
