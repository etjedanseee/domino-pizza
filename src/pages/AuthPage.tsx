import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useActions } from '../hooks/useActions';
import { supabase } from '../supabaseClient'
import AddButton from '../UI/AddButton';
import { regEmail, regPhone } from '../utils/consts';

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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const { setUser } = useActions()

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
      //в случае если нет ошибки(прям тут) показать что нужно подтвердить почту и возможно закрывать форму
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
      //в случае если нет ошибки(прям тут) показать что вошли успешно
      onClose()
      //придумать какие поля нужны (например токен) и передать их
      // setUser(data)
    } catch (e) {
      setAuthError('Неправильный адрес или пароль')
      console.log('singIn error', e)
    }

  }

  return (
    <div className='min-w-[320px] flex flex-col items-center bg-white rounded-2xl'>
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
    </div>
  );
}

export default AuthPage