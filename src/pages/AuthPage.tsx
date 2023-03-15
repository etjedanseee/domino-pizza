import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { supabase } from '../supabaseClient'
import AddButton from '../UI/AddButton';
import { regEmail, regPhone } from '../utils/consts';

interface FormData {
  email: string,
  password: string,
  phone?: string
}

type loginOrRegistrationType = 'login' | 'registration'

const AuthPage = () => {
  const [loginOrRegistration, setLoginOrRegistration] = useState<loginOrRegistrationType>('login')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    if (loginOrRegistration === 'login') {
      console.log('login', data)
    } else {
      console.log('registr', data)
    }
    reset()
  });

  const handleLoginOrRegistr = (type: loginOrRegistrationType) => {
    setLoginOrRegistration(type)
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
            {errors.phone?.type === 'required' && <div className='text-red-500 text-sm'>Номер обязательна</div>}
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