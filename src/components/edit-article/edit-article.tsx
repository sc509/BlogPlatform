import { useState } from 'react';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';

import { toast } from 'react-toastify';

import styles from '../../components/new-article/new-article.module.scss';

import { Button, message, Popconfirm, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

import { useNavigate, useParams } from 'react-router-dom';

import {useEditArticleMutation, useGetArticleBySlugQuery, useGetArticlesListQuery} from '../../redux/articleApi.tsx';
import {useAppSelector} from "../../redux/store.ts";

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  message.success('The tag has been successfully removed');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  message.error('You canceled the deletion of the tag');
};

interface EditArticleForm {
  title: string;
  description: string;
  textArticle: string;
  tags: { value: string }[];
}

interface ArticleEditProps {
  slug: string;
}

function EditArticle() {
  const { slug } = (useParams() as unknown) as ArticleEditProps;
  const [size] = useState<SizeType>('large');
  const [inputValue, setInputValue] = useState('');
  const [text, setText] = useState('');
  const [editArticle] = useEditArticleMutation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetArticleBySlugQuery(slug);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const articlesQuery = useGetArticlesListQuery({ page: currentPage });
  if (text.length < 0) {
    toast.error('Text length must be greater than 0 ');
  }
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditArticleForm>({
    defaultValues: {
      title: data?.article.title,
      description: data?.article.description,
      textArticle: data?.article.body,
      tags: data?.article.tagList.map(tag => ({ value: tag })) || [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });
  const addTag = (event) => {
    if ((event.key === 'Enter' || event.type === 'click') && inputValue !== '') {
      append({ value: inputValue });
      setInputValue('');
    }
  };

  const deleteTag = (index) => {
    remove(index);
  };
  const onSubmit: SubmitHandler<EditArticleForm> = async (data) => {
    try {
      const tagList = data.tags.map(tag => tag.value);
      const response = await editArticle({
        slug,
        title: data.title,
        description: data.description,
        body: data.textArticle,
        tagList: tagList,
      });
      if (response) {
        articlesQuery.refetch();
        navigate('/');
        toast.success('The article has been successfully edited');
      }
    } catch (err) {
      toast.error('Error while editing an article.');
    }
  };
  const {
    newArticleForm,
    newArticleFormHeader,
    newArticleFormInputGroup,
    tagAddButton,
    newArticleFormMiniHeader,
    newArticleFormInputGroupInput,
    newArticleFormInputGroupInputError,
    newArticleFormInputGroupError,
    newArticleFormInputGroupInputText,
    newArticleFormInputGroupSolo,
    makeTags,
    makeTagsGroup,
    tagsGroup,
    tagsGroupInput,
    tagAdd,
    deleteTagButton,
    newArticleFormSend,
    newArticleFormButton,
    newArticleFormSendText,
  } = styles;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={newArticleForm}>
        <h1 className={newArticleFormHeader}>Edit article</h1>
        <div className={newArticleFormInputGroup}>
          <div className={newArticleFormInputGroupSolo}>
            <h2 className={newArticleFormMiniHeader}>Title</h2>
            <input
              {...register('title', {
                required: 'Title is required',
              })}
              defaultValue={data.article.title}
              placeholder="Title"
              type="text"
              className={`${newArticleFormInputGroupInput} ${errors.title ? newArticleFormInputGroupInputError : ''}`}
            />
            {errors.title && <p className={newArticleFormInputGroupError}>{errors.title.message}</p>}
          </div>
          <div className={newArticleFormInputGroupSolo}>
            <h2 className={newArticleFormMiniHeader}>Short description</h2>
            <input
              {...register('description', {
                required: 'Short description is required',
              })}
              type="text"
              placeholder="Title"
              defaultValue={data.article.description}
              className={`${newArticleFormInputGroupInput} ${
                errors.description ? newArticleFormInputGroupInputError : ''
              }`}
            />
            {errors.description && <p className={newArticleFormInputGroupError}>{errors.description.message}</p>}
          </div>
          <div className={newArticleFormInputGroupSolo}>
            <h2 className={newArticleFormMiniHeader}>Text</h2>
            <textarea
              className={`${newArticleFormInputGroupInputText} ${
                errors.textArticle ? newArticleFormInputGroupInputError : ''
              }`}
              {...register('textArticle', {
                required: 'Text is required',
              })}
              placeholder="Text"
              defaultValue={data.article.body}
              onChange={(event) => setText(event.target.value)}
              rows={4}
              cols={50}
            ></textarea>
            {errors.textArticle && <p className={newArticleFormInputGroupError}>{errors.textArticle.message}</p>}
          </div>
          <div className={makeTags}>
            <h2 className={newArticleFormMiniHeader}>Tags</h2>
            <div className={makeTagsGroup}></div>
            {fields.map((field, index) => (
                <div key={field.id} className={tagsGroup}>
                  <input
                      className={tagsGroupInput}
                      {...register(`tags.${index}.value`)}
                      type="text"
                      defaultValue={field.value}
                  />
                  <Popconfirm
                      title="Delete the tag"
                      description="Are you sure to delete this tag?"
                      onConfirm={(e) => {
                        confirm(e);
                        deleteTag(index);
                      }}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                  >
                    <Button danger className={deleteTagButton}>
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
            ))}
            <div className={tagAdd}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={addTag}
                placeholder="Tag"
                className={tagsGroupInput}
              />
              <Space wrap>
                <Button size={size} className={tagAddButton} onClick={addTag}>
                  Add tag
                </Button>
              </Space>
            </div>
          </div>
        </div>
        <div className={newArticleFormButton}>
          <button type="submit" className={newArticleFormSend}>
            <p className={newArticleFormSendText}>Send</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditArticle;
