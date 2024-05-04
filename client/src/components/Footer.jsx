import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'

export default function FooterComp() {
  return (
    <Footer container className='border border-t-8 border-blue-700'>
        <div className='w-full max-w-7xl mx-auto'>
            {/* Grids */}
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div>
                <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-white">
                    <span className='px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg'>PeakAid</span>
                </Link>
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <Footer.Title title='About'  className='mt-4'/>
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='#'
                                rel='noopener noreferrer'
                            >
                                About the Project
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow Me!' className='mt-4' />
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='https://www.instagram.com/just_alm_tmr/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My Instagram
                            </Footer.Link>
                            <Footer.Link 
                                href='https://www.facebook.com/temir.alimov.12/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My Facebook
                            </Footer.Link>
                            <Footer.Link 
                                href='https://www.threads.net/@just_alm_tmr'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My Threads
                            </Footer.Link>
                            <Footer.Link 
                                href='https://github.com/temal07'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My GitHub
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal' className='mt-4' />
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='#'
                            >
                                Terms & Conditions
                            </Footer.Link>
                            <Footer.Link 
                                href='#'
                            >
                                Privacy Policy
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright 
                    href="#" 
                    by='PeakAid' 
                    year={new Date().getFullYear()} 
                />
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href='https://www.facebook.com/temir.alimov.12/' icon={BsFacebook} />
                    <Footer.Icon href='https://www.instagram.com/just_alm_tmr/' icon={BsInstagram} />
                    <Footer.Icon href='#' icon={BsTwitter} />
                    <Footer.Icon href='https://github.com/temal07' icon={BsGithub} />
                </div>
            </div>
        </div>     
    </Footer>
  )
}
