import { useState } from 'react';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';

  import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './new-article.module.scss';

import { Button, message, Popconfirm, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useCreateArticleMutation, useGetArticlesListQuery } from '../../redux/articleApi.tsx';
import { articleSlice } from '../../redux/slice/article-slice.ts';
import { paginationSlice } from '../../redux/slice/pagination-slice.ts';

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  message.success('The tag has been successfully removed');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  message.error('You canceled the deletion of the tag');
};

interface NewArticleForm {
  title: string;
  description: string;
  textArticle: string;
  tags: { value: string }[];
}

function NewArticle() {
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const articlesQuery = useGetArticlesListQuery({ page: currentPage });
  const navigate = useNavigate();
  const [size] = useState<SizeType>('large'); // default is 'middle'
  const [inputValue, setInputValue] = useState('');
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector((state) => state.pagination.articleCount);
  const { setArticleCount } = paginationSlice.actions;
  const { addArticleToStore } = articleSlice.actions;
  const [createArticle] = useCreateArticleMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewArticleForm>();
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
  }
  const onSubmit: SubmitHandler<NewArticleForm> = async (data) => {
    try {
      const tagList = data.tags.map(tag => tag.value);
      const response = await createArticle({
        title: data.title,
        description: data.description,
        body: data.textArticle,
        tagList: tagList,
      });
      if (response) {
        toast.success('Статья успешно создана');
        // @ts-ignore
        dispatch(addArticleToStore(response.data.article));
        dispatch(setArticleCount(totalCount + 1));
        articlesQuery.refetch();
        navigate('/');
      }
    } catch (err) {
      toast.error('Произошла ошибка при создании статьи');
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
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={newArticleForm}>
        <h1 className={newArticleFormHeader}>Create new article</h1>
        <div className={newArticleFormInputGroup}>
          <div className={newArticleFormInputGroupSolo}>
            <h2 className={newArticleFormMiniHeader}>Title</h2>
            <input
              {...register('title', {
                required: 'Title is required',
              })}
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
              value={text}
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

export default NewArticle;
