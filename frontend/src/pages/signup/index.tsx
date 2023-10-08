import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import Header from '@/components/header'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

export default function Login() {

  const [signuping, setsignuping] = useState(false);

  
  const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

  

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain uppercase letter, lowercase letter, and number'
      ),
    repassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), "null"], 'Passwords must match')
  });


  const formikRegister = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repassword: ''
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setsignuping(true);
      const { name, email, password } = values;
      console.log(name);
      console.log(email);
      console.log(password);

      const requestData = {
        name: String(name),
        email: String(email),
        password: String(password)
      };

      try {
        const response = await fetch('https://penny-canchu-api.octave.vip/api/1.0/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (response.ok) {
          console.log('註冊成功');
       
          window.location.href = '/login';
        
        } else {
          console.error('註冊失敗:', data.error);
          if (response.status >= 500 && response.status <= 599) {
            alert('出現錯誤。請稍後再試或通知我們的工程團隊。');
            window.location.href = '/login';
          } else {
            const errorMessage = `註冊失敗: ${data.error}`;
            alert(errorMessage);
            window.location.href = '/login';
          }
        }
      } catch (error) {
        console.error('請求錯誤:', error);
      }
    }
  });

  return (
    <><div className="flex flex-col items-center bg-white">
          <div className="bg-white rounded-lg mt-5 w-[60%]">
              <div className="flex flex-row">
                 
                  <div className="w-[65%] bg-white p-10 rounded-r-lg">
           
                  <div className="light dark:text-white text-mainBlue text-center font-zen-dots text-4xl font-normal" >
                        EduStream
                    </div>
                      <div className="text-2xl text-center my-10">會員註冊</div>
                     
                          <form onSubmit={formikRegister.handleSubmit} className="w-4/5 mx-auto">
                              <div className="mb-5">
                                  <label htmlFor="name" className="block font-medium text-lg text-gray-700">使用者名稱</label>
                                  <input
                                      type="text"
                                      id="name"
                                   
                                      placeholder="例: Chou Chou Hu"
                                      className="w-full h-12 px-3 rounded border  focus:outline-none focus:border-black"
                                      {...formikRegister.getFieldProps('name')} />
                                  {formikRegister.touched.name && formikRegister.errors.name && (
                                      <div className="text-red-500 mt-1">{formikRegister.errors.name}</div>
                                  )}
                              </div>
                              <div className="mb-5">
                                  <label htmlFor="email" className="block font-medium text-lg text-gray-700">電子郵件</label>
                                  <input
                                      type="email"
                                      id="email"
                                  
                                      className="w-full h-12 px-3 rounded border  focus:outline-none focus:border-black"
                                      placeholder="例: shirney@appworks.tw"
                                      {...formikRegister.getFieldProps('email')} />
                                  {formikRegister.touched.email && formikRegister.errors.email && (
                                      <div className="text-red-500 mt-1">{formikRegister.errors.email}</div>
                                  )}
                              </div>
                              <div className="mb-5">
                                  <label htmlFor="password" className="block font-medium text-lg text-gray-700">密碼</label>
                                  <input
                                      type="password"
                                      id="password"
                               
                                      className="w-full h-12 px-3 rounded border  focus:outline-none focus:border-black"
                                      {...formikRegister.getFieldProps('password')} />
                                  {formikRegister.touched.password && formikRegister.errors.password && (
                                      <div className="text-red-500 mt-1">{formikRegister.errors.password}</div>
                                  )}
                              </div>
                              <div className="mb-5">
                                  <label htmlFor="repassword" className="block font-medium text-lg text-gray-700">確認密碼</label>
                                  <input
                                      type="password"
                                      id="repassword"
                                  
                                      className="w-full h-12 px-3 rounded border  focus:outline-none focus:border-black"
                                      {...formikRegister.getFieldProps('repassword')} />
                                  {formikRegister.touched.repassword && formikRegister.errors.repassword && (
                                      <div className="text-red-500 mt-1">{formikRegister.errors.repassword}</div>
                                  )}
                              </div>
                              {signuping ? (
                                  <div className="mb-5">
                                      <div className="bg-gray-500 w-full h-12 rounded flex items-center justify-center">
                                          <div className="text-white">註冊中...</div>
                                      </div>
                                  </div>
                              ) : (
                                  <div className="mb-5">
                                      <button className="bg-mainBlue w-full h-12 rounded text-white font-medium text-lg hover:bg-blue-400" type="submit">
                                          註冊
                                      </button>
                                  </div>
                              )}
                          </form>
                    
                      <div className="text-center mt-3">
                    
                              <div className="text-gray-700">
                                  已經是會員了?{' '}
                                  <Link className="text-mainBlue"  href="/login">
                                      會員登入
                                  </Link>
                              </div>
                      
                             
                      </div>
                  </div>
                  <div className="w-[35%] bg-mainBlue text-white p-10 rounded-r-lg">
                      
                  </div>
              </div>
          </div>
      </div></>
  );
}
