import React from 'react'
import moment from 'moment'
import { RichText } from '@graphcms/rich-text-react-renderer';

const PostDetail = ({post}) => {
  const post2 = post.content.raw;
  console.log({post2});

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-one':
        return <h1 key={index} className="font-bold leading-tight text-5xl mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h1>;
      case 'heading-two':
        return <h2 key={index} className="mb-4 leading-tight text-3xl md:text-4xl lg:text-4xl font-bold">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
      case 'heading-three':
        return <h3 key={index} className="mb-4 leading-tight text-2xl md:text-3xl lg:text-3xl font-bold dark:text-whit">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="mb-4 leading-tight text-xl md:text-2xl lg:text-3xl font-bold">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'heading-five':
        return <h5 key={index} className="mb-4 leading-tight text-base md:text-xl lg:text-2xl font-bold">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h5>;
      case 'heading-six':
        return <h6 key={index} className="mb-4 leading-tight text-sm md:text-base lg:text-xl font-bold">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h6>;  
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      case 'block-quote':
        return <blockquote key={index} className="p-4 my-4 bg-gray-50 border-l-4 border-gray-300">
          <p className="text-base font-medium leading-relaxed text-gray-900 font-mono">
            {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
          </p>
        </blockquote>
      case 'code-block':
        return <code className="block whitespace-pre overflow-x-auto p-4 bg-gray-50 border-l-4" v-text="dataset.bibText">
          {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
        </code>
      default:
        return modifiedText;
    }
  };




  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img 
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>

      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img src={post.author.photo.url} 
            alt={post.author.name}
            height="30px"
            width="30px"
            className="align-middle rounded-full"
            />

            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {post.author.name}
            </p>
          </div>

          <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <span>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>
        <h1 
          className="mb-8 text-4xl font-extrabold tracking-tight leading-none
           text-gray-900 md:text-5xl lg:text-6xl">
            {post.title}
        </h1>
        
        {post.content.raw.children.map((typeObj, index) => {
          const children = 
            typeObj
            .children
            .map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))

          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail