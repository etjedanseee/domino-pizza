import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { supabase } from '../supabaseClient'
import AddButton from '../UI/AddButton';
import { regEmail, regPhone } from '../utils/consts';
import { ReactComponent as AuthIcon } from '../assets/user.svg'
interface FormData {
  email: string,
  password: string,
  phone: string
}

interface singInData {
  email: string,
  password: string
}

interface AuthPageProps {
  onClose: () => void
}

type loginOrRegistrationType = 'login' | 'registration'

const AuthPage = ({ onClose }: AuthPageProps) => {
  const [loginOrRegistration, setLoginOrRegistration] = useState<loginOrRegistrationType>('login')
  const [authError, setAuthError] = useState('')

  const { user } = useTypedSelector(state => state.auth)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const { setUser, showNotification, getUserOrders } = useActions()

  const onSubmit = handleSubmit(data => {
    setAuthError('')
    if (loginOrRegistration === 'login') {
      singIn(data)
    } else {
      singUp(data)
    }
    reset()
  });

  const handleLoginOrRegistr = (type: loginOrRegistrationType) => {
    setLoginOrRegistration(type)
    reset()
  }

  const signOut = () => {
    setUser(null)
    onClose()
    showNotification({ text: 'Успешно вышли', color: 'green' })
  }

  const onGetOrders = () => {
    getUserOrders()
  }

  const singUp = async (singUpData: FormData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: singUpData.email,
        password: singUpData.password,
        options: { data: { phone: singUpData.phone } }
      })
      if (error) {
        throw new Error(error.message)
      }
      showNotification({ text: 'Подтвердите почту', color: 'yellow' })
      onClose()
      console.log('singUp data', data)
    } catch (e) {
      console.log('singUp error', e)
      setAuthError('Ошибка при регистрации')
    }
  }

  const singIn = async (singInData: singInData) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: singInData.email,
        password: singInData.password,
      })
      if (error) {
        throw new Error(error.message)
      }
      console.log('singIn data', data)
      showNotification({ text: 'Вход выполнен успешно!', color: 'green' })
      onClose()

      //придумать какие поля нужны (например токен) и передать их
      const userObj = {
        id: data.user?.id || '0',
        data: {
          email: data.user?.email || '0',
          phone: data.user?.user_metadata.phone || '0'
        }
      }
      setUser(userObj)
    } catch (e) {
      setAuthError('Неправильная почта или пароль')
      console.log('singIn error', e)
    }
  }

  return (
    <div className='min-w-[320px] flex flex-col items-center bg-white rounded-2xl'>
      {user ? (
        <div className='p-4 text-lg flex flex-col items-center'>
          <AuthIcon className='h-12 w-12 fill-blue-700 mb-2' />
          <div className='mb-1 font-medium'>{user.data.email}</div>
          <div className='mb-2 font-medium'>{user.data.phone}</div>
          <div
            onClick={onGetOrders}
            className='text-white font-medium px-8 py-1 bg-blue-500 rounded-2xl mb-2'
          >
            Посмотреть историю заказов
          </div>
          <div onClick={signOut} className='text-white font-medium px-8 py-1 bg-red-500 rounded-2xl'>Выйти</div>
        </div>
      )
        : (
          <>
            <div className='w-full flex items-center text-center font-medium'>
              <div
                className={`${loginOrRegistration === 'login'
                  ? 'text-black bg-white border-red-500'
                  : 'text-gray-500 bg-gray-200'} 
          px-8 py-4 border-b-4 w-1/2 rounded-tl-2xl`}
                onClick={() => handleLoginOrRegistr('login')}
              >
                Вход
              </div>
              <div
                className={`${loginOrRegistration === 'registration'
                  ? 'text-black bg-white border-red-500'
                  : 'text-gray-600 bg-gray-200'} 
          px-8 py-4 border-b-4 w-1/2 rounded-tr-2xl`}
                onClick={() => handleLoginOrRegistr('registration')}
              >
                Регистрация
              </div>
            </div>

            <form className='w-full py-4 px-4'>
              {authError.length > 0 && (
                <div className='text-red-500 mb-4 font-medium'>{authError}</div>
              )}

              <div className='mb-4'>
                <input
                  {...register("email", { required: true, pattern: regEmail })}
                  placeholder='Введите адрес эл. почты'
                  className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
                  spellCheck="false"
                />
                {errors.email?.type === 'required' && <div className='text-red-500 text-sm'>Почта обязательна</div>}
                {errors.email?.type === 'pattern' && <div className='text-red-500 text-sm'>Введите корректную почту</div>}
              </div>

              {loginOrRegistration === 'registration' && (
                <div className='mb-4'>
                  <input
                    {...register("phone", { required: true, pattern: regPhone })}
                    placeholder='Введите номер телефона'
                    className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
                  />
                  {errors.phone?.type === 'required' && <div className='text-red-500 text-sm'>Номер обязателен</div>}
                  {errors.phone?.type === 'pattern' && <div className='text-red-500 text-sm'>Введите корректный номер</div>}
                </div>
              )}

              <div className='mb-4'>
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder='Введите пароль'
                  className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
                  spellCheck="false"
                />
                {errors.password?.type === 'required' && <div className='text-red-500 text-sm'>Пароль обязателен</div>}
                {errors.password?.type === 'minLength' && <div className='text-red-500 text-sm'>Пароль должен быть больше 5 символов</div>}
              </div>

              <AddButton
                price={-1}
                onClick={onSubmit}
                title={loginOrRegistration === 'login' ? 'Войти' : 'Отправить подтверждение'}
                justify='justify-center'
              />

              {loginOrRegistration === 'login' && <div className='text-red-500 text-center'>Забыли пароль?</div>}

            </form>
          </>
        )
      }

    </div>
  );
}

export default AuthPage