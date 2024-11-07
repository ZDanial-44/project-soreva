 <template>
  <div id="ThisIsAll">
    <div id="reviews-section">
      <div v-for="(review, index) in reviews" :key="index" class="review">
        <div class="review-info">
          <img v-if="user && user.photoURL" :src="user.photoURL" alt="User Photo" class="w-8 h-8 rounded-full m-2" />
          <strong>{{ review.author }}:</strong>
          <span class="timestamp">{{ review.time }}</span>
        </div>
        <div class="review-text">
          <p>{{ review.text }}</p>
        </div>
        <div class="rating">
          <span v-for="star in 5" :key="star" class="star" :class="{'filled': star <= review.rating}">★</span>
        </div>
      </div>
    </div>

    <div class="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-full max-w-lg p-4 bg-neutral-800 rounded-lg shadow-lg">
      <div class="flex flex-col space-y-3">
        <div class="flex items-center space-x-2">
          <label class="text-white ">Оценка:</label>
          <select v-model="rating" @change="validateReview" class="bg-neutral-800 mr-3 rounded-md">
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        
        <textarea 
          v-model="reviewInput" 
          @keydown.enter="submitReview"
          placeholder="Напишите отзыв"
          rows="2"
          class="w-full bg-neutral-700 text-white p-2 rounded resize-none focus:outline-none focus:ring focus:ring-red-500"
        ></textarea>

        <p v-if="reviewInput.length > maxReviewLength" class="text-red-500 text-sm">
          Отзыв не может состоять из более чем {{ maxReviewLength }} символов!
        </p>

        <button 
          @click="submitReview"
          class="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded transition duration-200"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  name: "ReviewComponent",
  data() {
    return {
      reviews: [],
      reviewInput: "",
      rating: 5,
      user: null, 
      maxReviews: 250,
      maxReviewLength: 300,
    };
  },
  mounted() {
    this.loadReviews();
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.user = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
        }
      });
    },
    submitReview() {
      const reviewText = this.reviewInput.trim();

      if (reviewText.length > this.maxReviewLength) {
        alert(`Отзыв не может состоять из более чем ${this.maxReviewLength} символов!`);
        return;
      }

      if (reviewText && this.user) {
        const now = new Date();
        const review = {
          text: reviewText,
          author: this.user.name || "Anonymous",
          time: now.toLocaleTimeString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
          rating: this.rating,
          photoURL: this.user.photoURL,
        };
        this.addReviewToList(review);
        this.saveReviewToLocalStorage(review);
        this.reviewInput = "";
      }
    },
    addReviewToList(review) {
      this.reviews.push(review);

      if (this.reviews.length > this.maxReviews) {
        this.reviews.shift();
      }
    },
    saveReviewToLocalStorage(review) {
      let reviews = localStorage.getItem("reviews");
      reviews = reviews ? JSON.parse(reviews) : [];
      reviews.push(review);

      if (reviews.length > this.maxReviews) {
        reviews = reviews.slice(-this.maxReviews);
      }

      localStorage.setItem("reviews", JSON.stringify(reviews));
    },
    loadReviews() {
      let reviews = localStorage.getItem("reviews");
      this.reviews = reviews ? JSON.parse(reviews) : [];
    },
    validateReview() {
      if (this.rating < 1 || this.rating > 5) {
        this.rating = 5;
      }
    },
  },
};
</script>

<style scoped>
#ThisIsAll {
  color: white;
  width: 80%;
  margin-left: 10%;
  text-align: left;
}

#reviews-section {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column-reverse;
}

.review {
  margin: 10px 0;
  padding: 15px;
  width: max-content;
  background-color: #434343;
  border-radius: 10px;
  border-bottom: 1px solid #444;
}

.review-info {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.review-text {
  margin-top: 10px;
}

.timestamp {
  font-size: 0.8em;
  color: #888;
  margin-left: 10px;
}

.rating {
  margin-top: 10px;
}

.star {
  font-size: 20px;
  color: #ccc;
}

.star.filled {
  color: #f1c40f;
}

select {
  padding: 5px;
  margin-top: 5px;
  -webkit-appearance: none; 
  -moz-appearance: none; 
  appearance: none; 
  background-color: #434343; 
  color: white;
  border: 1px solid #444; 
  padding: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

select:hover, select:focus{
  border-color: #e74c3c;
  box-shadow: 0 0 3px #e74c3c;
  background-color: #e74c3c!important;
}

option {
  background-color: #434343; 
  color: white; 
}

select option:checked {
  background-color: #e74c3c; 
  color: white;
}

.warning {
  color: #e74c3c;
  font-size: 0.9em;
}

.WIDTH {
  width: 100%;
}
</style>
