import CreatePostCard from './CreatePostCard'
import PostCard from './PostCard'
import useGetPublications from '../../../../hooks/useGetPublications'

const FeedCard = () => {
    const {loading, publications, refetchPublications } = useGetPublications();
    
  return (
    
    <div className=' overflow-hidden flex-[12] bg-transparent rounded-3xl  mt-4'>
        <CreatePostCard onPostSuccess={refetchPublications}/>

                    {/* Ovde normalno renderuj postove */}
                    {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-hidden flex-[12] bg-transparent rounded-3xl mt-4">
                {publications && publications.length > 0 ? (
                  publications.map((publication) => (
                    <PostCard key='publication.id' publication={publication}/>
                  ))
                ) : (
                  <div>No publications available</div>
                )}
              </div>
            )}

    
    </div>

)
}

export default FeedCard